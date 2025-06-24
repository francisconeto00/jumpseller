module Api
  class CitiesController < ApplicationController
    def index
      cities = City.all

      if params[:q].present?
        cities = cities.where("LOWER(name) LIKE ?", "#{params[:q].downcase}%")
      end

      # Pagination (defaults 1)
      page = (params[:page] || 1).to_i
      per_page = (params[:per_page] || 20).to_i
      total = cities.count
      cities = cities.offset((page - 1) * per_page).limit(per_page)

      # Render JSON with metadata
      render json: {
        cities: cities,
        meta: {
          total: total,
          page: page,
          per_page: per_page,
          total_pages: (total / per_page.to_f).ceil
        }
      }
    end
  end
end
