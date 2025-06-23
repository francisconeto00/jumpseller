module Api
  class SunEventsController < ApplicationController
    def show
      city_id = params[:id]
      date_start = params[:date_start]
      date_end = params[:date_end]
      today = Date.today

      # Validations
      unless city_id.present?
        return render json: { error: "Missing city" }, status: :bad_request
      end

      # Parse dates
      if date_start.present? && date_end.present?
        start_date = Date.parse(date_start) rescue today
        end_date = Date.parse(date_end) rescue today
      else
        start_date = today
        end_date = today
      end

      if start_date > end_date
        return render json: { error: "date_start must be before or equal to date_end" }, status: :bad_request
      end

      # Fetch city
      city = City.find_by(id: city_id)

      unless city
        Rails.logger.info("[SunEventsController] Params: #{params.inspect} | NO DATA (City not found)")
        return render json: { sunrise: nil, sunset: nil }, status: :ok
      end

      range = (start_date..end_date).to_a

      existing_sunrises = Sunrise.where(city_id: city.id, date: range).pluck(:date, :value).to_h.transform_keys(&:to_s)
      existing_sunsets = Sunset.where(city_id: city.id, date: range).pluck(:date, :value).to_h.transform_keys(&:to_s)

      missing_dates = range.select do |date|
        d_str = date.to_s
        !existing_sunrises.key?(d_str) || !existing_sunsets.key?(d_str)
      end

      if missing_dates.any?
        Rails.logger.info "Fetching missing sun data for city_id=#{city.id} dates=#{missing_dates}"
        fetched_data = SunDataFetcher.fetch_range(city, missing_dates.first.to_s, missing_dates.last.to_s)

        # Update Data
        fetched_data&.each do |date, data|
          existing_sunrises[date] = data[:sunrise]
          existing_sunsets[date] = data[:sunset]
        end
      end

     result = range.map do |date|
        d = date.to_s
        {
          date: d,
          sunrise: existing_sunrises[d]&.strftime("%H:%M:%S"),
          sunset: existing_sunsets[d]&.strftime("%H:%M:%S")
        }
      end

      render json: {
        city: city.name,
        data: result
      }
    end
  end
end
