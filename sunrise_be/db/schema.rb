# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_06_24_112722) do
  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.string "country"
    t.decimal "lat"
    t.decimal "long"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dawns", force: :cascade do |t|
    t.integer "city_id"
    t.date "date"
    t.time "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id", "date"], name: "index_dawns_on_city_id_and_date", unique: true
  end

  create_table "dusks", force: :cascade do |t|
    t.integer "city_id"
    t.date "date"
    t.time "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id", "date"], name: "index_dusks_on_city_id_and_date", unique: true
  end

  create_table "golden_hours", force: :cascade do |t|
    t.integer "city_id"
    t.date "date"
    t.time "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id", "date"], name: "index_golden_hours_on_city_id_and_date", unique: true
  end

  create_table "sunrises", force: :cascade do |t|
    t.integer "city_id", null: false
    t.date "date"
    t.time "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id", "date"], name: "index_sunrises_on_city_id_and_date", unique: true
    t.index ["city_id"], name: "index_sunrises_on_city_id"
  end

  create_table "sunsets", force: :cascade do |t|
    t.integer "city_id", null: false
    t.date "date"
    t.time "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id", "date"], name: "index_sunsets_on_city_id_and_date", unique: true
    t.index ["city_id"], name: "index_sunsets_on_city_id"
  end

  add_foreign_key "sunrises", "cities"
  add_foreign_key "sunsets", "cities"
end
