class AddUniqueIndexToSunrisesAndSunsets < ActiveRecord::Migration[8.0]
  def change
    add_index :sunrises, [ :city_id, :date ], unique: true
    add_index :sunsets,  [ :city_id, :date ], unique: true
  end
end
