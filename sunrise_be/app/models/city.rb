class City < ApplicationRecord
  has_many :sunrises, dependent: :destroy
  has_many :sunsets, dependent: :destroy
end
