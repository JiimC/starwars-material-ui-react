const mongoose = require('mongoose');
const { Schema } = mongoose;

exports.apimapModel = () => {

  const apimapSchema = new Schema({
    url: String,
    refid: String
  });

  const Apimap = mongoose.model( 'apimap', apimapSchema );

  return Apimap;
}

exports.filmModel = () => {

  const filmSchema = new Schema({
    resourceType: String,
    api_id: String,
    "title": String,
    "episode_id": Number,
    "opening_crawl": String,
    "director": String,
    "producer": String,
    "release_date": String,
    "characters": [
      String
    ],
    "planets": [
      String
    ],
    "starships": [
      String
    ],"vehicles": [
      String
    ],
    "species": [
      String
    ],
    "created": Date,
    "edited": Date,
    "url": String
  });

  const Film = mongoose.model( 'film', filmSchema );

  return Film;
}


exports.characterModel = () => {

  const characterSchema = new Schema({
    resourceType: String,
    api_id: String,
    name: String, // String is shorthand for {type: String}
    height: String,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_year: String,
    gender: String,
    homeworld: String,
    films: [String],
    species: [String],
    vehicles: [String],
    starships: [String],
    created: Date,
    edited: Date,
    url: String
  });

  const Character = mongoose.model( 'character', characterSchema );

  return Character;
}

exports.planetModel = () => {

  const planetSchema = new Schema({
    resourceType: String,
    api_id: String,
    "name": String,
    "rotation_period": String,
    "orbital_period": String,
    "diameter": String,
    "climate": String,
    "gravity": String,
    "terrain": String,
    "surface_water": String,
    "population": String,
    "residents": [
      String
    ],
    "films": [
      String
    ],
    "created": Date,
    "edited": Date,
    "url": String
  });

  const planet = mongoose.model( 'planet', planetSchema );

  return planet;
}

exports.starshipModel = () => {

  const starshipSchema = new Schema({
    resourceType: String,
    api_id: String,
    "name": String,
    "model": String,
    "manufacturer": String,
    "cost_in_credits": String,
    "length": String,
    "max_atmosphering_speed": String,
    "crew": String,
    "passengers": String,
    "cargo_capacity": String,
    "consumables": String,
    "hyperdrive_rating": String,
    "MGLT": String,
    "starship_class": String,
    "pilots": [String],
    "films": [
      String
    ],
    "created": Date,
    "edited": Date,
    "url": String
  });

  const starship = mongoose.model( 'starship', starshipSchema );

  return starship;
}

exports.speciesModel = () => {

  const speciesSchema = new Schema({
    resourceType: String,
    api_id: String,
    "name": String,
    "classification": String,
    "designation": String,
    "average_height": String,
    "skin_colors": String,
    "hair_colors": String,
    "eye_colors": String,
    "average_lifespan": String,
    "homeworld": String,
    "language": String,
    "people": [
      String
    ],
    "films": [
      String
    ],
    "created": Date,
    "edited": Date,
    "url": String
  });

  const species = mongoose.model( 'species', speciesSchema );

  return species;
}


exports.getModel = {
  'character' : this.characterModel,
  'film' : this.filmModel,
  'planet' : this.planetModel,
  'starship' : this.starshipModel,
  'species' : this.speciesModel,
  'apimap' : this.apimapModel
}