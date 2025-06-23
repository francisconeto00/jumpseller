class CreateSunsets < ActiveRecord::Migration[8.0]
  def change
    create_table :sunsets do |t|
      t.references :city, null: false, foreign_key: true
      t.date :date
      t.time :value

      t.timestamps
    end
  end
end
