### Setup
1. Config.env file.
```
cd sunrise_be
cp .env.example .env
cd ../sunrise_fe
cp .env.example .env
```
2. Install dependencies

(FE directory)
    
Main technologies used:
- Typescript
- Maintine UI
- TailwindCSS
- Rechart
    
```
yarn i
```

(BE directory)
```
cd ../sunrise_be
bundler install
```
3. DB create and seed

(BE directory)
```
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed
```
The cities table will be seeded with data from [Open Data Soft - Geonames](https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/table/?disjunctive.cou_name_en&sort=name)

4. Run the project

(FE directory)
```
yarn dev
```

(BE directory)
```
bin/rails s
```