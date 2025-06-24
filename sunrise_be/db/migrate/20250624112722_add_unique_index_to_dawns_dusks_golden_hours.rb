class AddUniqueIndexToDawnsDusksGoldenHours < ActiveRecord::Migration[8.0]
  def change
    add_index :dawns, [ :city_id, :date ], unique: true
    add_index :dusks, [ :city_id, :date ], unique: true
    add_index :golden_hours, [ :city_id, :date ], unique: true
  end
end
