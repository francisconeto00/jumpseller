require "net/http"
require "uri"
require "json"

class SunDataFetcher
    API_URL = ENV["SUNRISE_SUNSET_API_URL"]

    def self.fetch_range(city, start_date, end_date)
      lat = city.lat
      long = city.long

      uri = URI(API_URL)
      params = {
        lat: lat,
        lng: long,
        date_start: start_date,
        date_end: (Date.parse(end_date) + 1).to_s, # API treats end_date as an open interval. Increment 1 to get the real end_date.
        time_format: 24
      }
      uri.query = URI.encode_www_form(params)
      Rails.logger.info(uri.query)
      response = Net::HTTP.get_response(uri)
      return nil unless response.is_a?(Net::HTTPSuccess)

      json = JSON.parse(response.body)
      return nil unless json["status"] == "OK" && json["results"].is_a?(Array)

      saved_data = {}
      sunrises = []
      sunsets = []
      json["results"].each do |day_data|
        date = day_data["date"]
        sunrise_time = Time.zone.parse(day_data["sunrise"]).strftime("%H:%M:%S")
        sunset_time  = Time.zone.parse(day_data["sunset"]).strftime("%H:%M:%S")

        sunrises << { city_id: city.id, date: date, value: sunrise_time, created_at: Time.now, updated_at: Time.now }
        sunsets << { city_id: city.id, date: date, value: sunset_time, created_at: Time.now, updated_at: Time.now }

        saved_data[date] = { sunrise: sunrise_time, sunset: sunset_time }
      end

      Sunrise.upsert_all(sunrises, unique_by: %i[city_id date])
      Sunset.upsert_all(sunsets, unique_by: %i[city_id date])

      saved_data
    rescue => e
      Rails.logger.error "SunDataFetcher error: #{e.message}"
      nil
  end
end
