# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'csv'

puts "Cleaning cities..."
City.delete_all

puts "Impording cities from CSV..."

filepath = Rails.root.join('db', 'geonames-all-cities-with-a-population-1000.csv')
cities = []

CSV.foreach(filepath, headers: true, col_sep: ';') do |row|
  coords = row['Coordinates'].split(',').map(&:strip)
  lat = coords[0].to_f
  long = coords[1].to_f

  cities << {
    name: row['ASCII Name'] || row['Name'],
    country: row['Country name EN'],
    lat: lat,
    long: long
    }
end

cities.sort_by! { |city| city[:name].downcase }
puts "Inserting #{cities.size} cities into the database..."
cities.each_with_index do |city, index|
  City.create!(city)
  puts "Inserted city #{index + 1}/#{cities.size}" if (index + 1) % 100 == 0
end
puts "Import completed."
