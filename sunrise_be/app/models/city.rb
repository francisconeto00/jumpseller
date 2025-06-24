class City < ApplicationRecord
  has_many :sunrises, dependent: :destroy
  has_many :sunsets, dependent: :destroy
  has_many :dawns, dependent: :destroy
  has_many :dusks, dependent: :destroy
  has_many :golden_hours, dependent: :destroy
end
