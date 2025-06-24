class CreateGoldenHours < ActiveRecord::Migration[8.0]
  def change
    create_table :golden_hours do |t|
      t.integer :city_id
      t.date :date
      t.time :value

      t.timestamps
    end
  end
end
