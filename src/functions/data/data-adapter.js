const mongoose = require('mongoose');
const models = require('./schemas/model');
const _ = require('lodash');

let model = {};

exports.createConnection = async () => {
  try {
    await mongoose.connect('mongodb://root:example@localhost:27017/starwars', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });
    console.log('connected...');
  } catch (err) {
    console.log('error...');
    throw (err);
  }
}

// create

exports.createResource = async (resource) => {
  try {
    let local_model;
    let resourceObj = _.cloneDeep(resource);
    if (
      resourceObj &&
      !resourceObj.resourceType
    ) {
      throw new Error(`resourceType not supplied`);
    }
    if( !model[resourceObj.resourceType] ){
      model[resourceObj.resourceType] = models.getModel[resourceObj.resourceType](mongoose);
    }
    local_model = model[resourceObj.resourceType];
    let doc = local_model(resourceObj);
    await doc.save();
    console.log(`Created ${JSON.stringify( doc )}`);
    return doc;
  } catch (err) {
    throw (err);
  }
}

exports.createCharacter = async (mongoose, characterObj) => {
  characterObj = characterObj ? characterObj : {
    "api_id": '1',
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "http://swapi.dev/api/planets/1/",
    "films": [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/2/",
      "http://swapi.dev/api/films/3/",
      "http://swapi.dev/api/films/6/"
    ],
    "species": [],
    "vehicles": [
      "http://swapi.dev/api/vehicles/14/",
      "http://swapi.dev/api/vehicles/30/"
    ],
    "starships": [
      "http://swapi.dev/api/starships/12/",
      "http://swapi.dev/api/starships/22/"
    ],
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-20T21:17:56.891000Z",
    "url": "http://swapi.dev/api/people/1/"
  };
  let characterModel = models.characterModel(mongoose);
  let characterDoc = new characterModel(characterObj);
  await characterDoc.save();
}

// read

// search

// update

// delete

// disconnect

try {
  this.createConnection()
} catch (err) {
  console.log(err);
}

