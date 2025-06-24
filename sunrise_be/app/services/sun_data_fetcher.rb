require "net/http"
require "uri"
require "json"

class SunDataFetcher
    API_URL = ENV["SUNRISE_SUNSET_API_URL"]

    def self.safe_parse_time(str)
      Time.zone.parse(str).strftime("%H:%M:%S") if str.present?
    rescue
      nil
    end

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
      dawns = []
      dusks = []
      golden_hours = []
      Rails.logger.info("SunDataFetcher: Day data sample: #{json["results"].first.inspect}")
      json["results"].each do |day_data|
        date = day_data["date"]
        sunrise_time = safe_parse_time(day_data["sunrise"])
        sunset_time = safe_parse_time(day_data["sunset"])
        dawn_time = safe_parse_time(day_data["dawn"])
        dusk_time = safe_parse_time(day_data["dusk"])
        golden_hour_time = safe_parse_time(day_data["golden_hour"])

        sunrises << { city_id: city.id, date: date, value: sunrise_time, created_at: Time.now, updated_at: Time.now }
        sunsets << { city_id: city.id, date: date, value: sunset_time, created_at: Time.now, updated_at: Time.now }
        dawns << { city_id: city.id, date: date, value: dawn_time, created_at: Time.now, updated_at: Time.now }
        dusks << { city_id: city.id, date: date, value: dusk_time, created_at: Time.now, updated_at: Time.now }
        golden_hours << { city_id: city.id, date: date, value: golden_hour_time, created_at: Time.now, updated_at: Time.now }


        saved_data[date] = {
          sunrise: sunrise_time,
          sunset: sunset_time,
          dawn: dawn_time,
          dusk: dusk_time,
          golden_hour: golden_hour_time
        }
      end
      Dawn.upsert_all(dawns, unique_by: %i[city_id date])
      Dusk.upsert_all(dusks, unique_by: %i[city_id date])
      GoldenHour.upsert_all(golden_hours, unique_by: %i[city_id date])

      Sunrise.upsert_all(sunrises, unique_by: %i[city_id date])
      Sunset.upsert_all(sunsets, unique_by: %i[city_id date])

      saved_data
    rescue => e
      Rails.logger.error "SunDataFetcher error: #{e.message}"
      nil
  end
end
