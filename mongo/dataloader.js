const axios = require('axios');
const _ = require('lodash');
let max_entries = 30;
let db_adapter = require('../src/functions/data/data-adapter');

const datasource = process.env.SWAPI_DATA_SOURCE ? process.env.SWAPI_DATA_SOURCE : 'mongodb'; // web || mongodb

exports.getSpecies = async (identifier) => {
  try {
    identifier = identifier.toString();
    let url;
    // check if the identifier is a valid url for the appropriate type
    if (
      identifier.match(/^http.+species\/\d+\//)
    ) {
      url = identifier;
    }
    if (
      identifier.match(/^\d+$/)
    ) {
      url = `https://swapi.dev/api/species/${identifier}/`
    }
    return await axios.get(url);
  } catch (err) {
    throw err;
  };
}

exports.db_getSpecies = async ( identifier ) => {
  try {
    identifier = identifier.toString();
    let query = {
      resourceType: "species",
      api_id: identifier
    }
    return await db_adapter.findOne( query );
  } catch (err) {
    throw err;
  };
}

exports.getCharacter = async (identifier) => {
  try {
    identifier = identifier.toString();
    let url;
    // check if the identifier is a valid url for the appropriate type
    if (
      identifier.match(/^http.+people\/\d+\//)
    ) {
      url = identifier;
    }
    if (
      identifier.match(/^\d+$/)
    ) {
      url = `https://swapi.dev/api/people/${identifier}/`
    }
    return await axios.get(url);
  } catch (err) {
    throw err;
  };
}

exports.getProcessedCharacter = async ( identifier ) => {
  let character = await this.getResourceFromAdapter[ datasource ]['character']( identifier );
  let api_id;
  let processedResource = _.cloneDeep( character );
  api_id = validURL( identifier ) ? this.getIdentifierFromUrl( identifier ) : identifier;
  processedResource.data.api_id = api_id;
  processedResource.data.resourceType = 'character';
  return processedResource ;
}

exports.getProcessedSpecies = async ( identifier ) => {
  let species = await this.getResourceFromAdapter[ datasource ]['species']( identifier );
  let api_id;
  let processedResource = _.cloneDeep( species );
  api_id = validURL( identifier ) ? this.getIdentifierFromUrl( identifier ) : identifier;
  processedResource.data.api_id = api_id;
  processedResource.data.resourceType = 'species';
  return processedResource ;
}

exports.getProcessedPlanet = async ( identifier ) => {
  let planet = await this.getResourceFromAdapter[ datasource ]['planet']( identifier );
  let api_id;
  let processedResource = _.cloneDeep( planet );
  api_id = validURL( identifier ) ? this.getIdentifierFromUrl( identifier ) : identifier;
  processedResource.data.api_id = api_id;
  processedResource.data.resourceType = 'planet';
  return processedResource ;
}

exports.getProcessedStarship = async ( identifier ) => {
  let starship = await this.getResourceFromAdapter[ datasource ]['starship']( identifier );
  let api_id;
  let processedResource = _.cloneDeep( starship );
  api_id = validURL( identifier ) ? this.getIdentifierFromUrl( identifier ) : identifier;
  processedResource.data.api_id = api_id;
  processedResource.data.resourceType = 'starship';
  return processedResource ;
}

exports.getProcessedFilm = async ( identifier ) => {
  let film = await this.getResourceFromAdapter[ datasource ]['film']( identifier );
  let api_id;
  let processedResource = _.cloneDeep( film );
  api_id = validURL( identifier ) ? this.getIdentifierFromUrl( identifier ) : identifier;
  processedResource.data.api_id = api_id;
  processedResource.data.resourceType = 'film';
  return processedResource ;
}

exports.getIdentifierFromUrl = ( url ) => {
  let match = [];
  match = url.match(/^http.+\/(people|starships|films|species|planets)\/(\d+)\//);
  if(match.length <= 1){ throw new Error(`unable to extract identifier`)}
  return match[2];
}

exports.getStarship = async (identifier) => {
  try {
    identifier = identifier.toString();
    let url;
    // check if the identifier is a valid url for the appropriate type
    if (
      identifier.match(/^http.+starships\/\d+\//)
    ) {
      url = identifier;
    }

    if (
      identifier.match(/^\d+$/)
    ) {
      url = `https://swapi.dev/api/starships/${identifier}/`

    }

    return await axios.get(url);
  } catch (err) {
    throw err;
  };
}

exports.getFilm = async (identifier) => {
  try {
    identifier = identifier.toString();
    let url;
    // check if the identifier is a valid url for the appropriate type
    if (
      identifier.match(/^http.+films\/\d+\//)
    ) {

      url = identifier;

    }

    if (
      identifier.match(/^\d+$/)
    ) {
      url = `https://swapi.dev/api/films/${identifier}/`

    }

    return await axios.get(url);
  } catch (err) {
    throw err;
  };
}

exports.getPlanet = async (identifier) => {
  try {
    identifier = identifier.toString();
    let url;
    // check if the identifier is a valid url for the appropriate type
    if (
      identifier.match(/^http.+planets\/\d+\//)
    ) {

      url = identifier;

    }

    if (
      identifier.match(/^\d+$/)
    ) {
      url = `https://swapi.dev/api/planets/${identifier}/`

    }

    return await axios.get(url);
  } catch (err) {
    throw err;
  };
}

const getRandomIndices = (limit, amount, lower_bound, upper_bound) => {

  limit = !limit ? 50 : limit;
  amount = !amount ? 50 : amount;
  lower_bound = (
    !lower_bound ||
    lower_bound > upper_bound
  ) ? 1 : lower_bound

  upper_bound = (
    !upper_bound ||
    lower_bound > upper_bound
  ) ? 50 : upper_bound;

  let dataIdx = [];
  limit = (amount < limit) ? amount : limit;
  while (dataIdx.length < limit) {
    let randomNumber = Math.floor(Math.random() * upper_bound) + lower_bound;
    // console.log( randomNumber );
    if (dataIdx.includes(randomNumber)) {
      continue;
    } else {
      dataIdx.push(randomNumber);
    }
  }
  console.log(`returning: ${dataIdx.length} elements`);
  return dataIdx;
}

exports.getData = async (type) => {
  let data = [];
  let fail = [];
  max_entries = type === 'film' ? 7 : max_entries;
  for (let i = 1; i < max_entries; i++) {
    try {
      let result = await this.getResource[type](i);
      //console.log(` ${result.data.name} ${i} `);
      data.push(result);
    } catch (err) {
      fail.push(i);
    }
  }
  return data;
};

exports.typeMap = {

  'starship': {
    name: 'name',
    secondary: [
      'manufacturer'
    ],
    summary: [
      'cost_in_credits',
      'length',
      'max_atmosphering_speed',
      'crew',
      'passengers',
      'cargo_capacity',
      'consumables',
      'hyperdrive_rating',
      'MGLT',
      'starship_class'
    ]
  },

  'character': {
    name: 'name',
    secondary: [
      'gender'
  ],
    summary: [
      'height',
      'mass',
      'hair_color',
      'skin_color',
      'eye_color',
      'birth_year'
    ]
  },

  'planet': {
    name: 'name',
    secondary: [
      'terrain'
    ],
    summary: [
      'population',
      'rotation_period',
      'orbital_period',
      'diameter',
      'climate',
      'gravity',
      'surface_water'
    ]
  },

  'film': {
    name: 'title',
    secondary: [],
    summary: []
  }
}

exports.getRandomData = async (type, limit) => {
  let data = [];
  let fail = [];
  max_entries = type === 'film' ? 7 : max_entries;
  let ids = type === 'film' ? [1, 2, 3, 4, 5, 6] : getRandomIndices();
  limit = type === 'film' ? 6 : limit
  console.log(ids);
  for (let i of ids) {
    try {
      let result = await this.getResource[type](i);
      console.log(` ${result.data.name || result.data.title} ${i} `);
      result.data.id = i;
      result.data.imagePath = `/images/${type}/${i}.jpg`;
      result.data.cardTitle = result.data[this.typeMap[type]['name']];
      result.data.secondaryText = this.typeMap[type]['secondary'].map( category =>{
        return `${category}: ${result.data[category]}`;
      });
      result.data.summaryText = this.typeMap[type]['summary'].map( category =>{
        return `${category}: ${result.data[category]}`;
      });
      result.data.summary = Object.keys(result.data).map(key => {
        return `${key}: ${result.data[key]}\n`
      }).toString();
      data.push(result);
    } catch (err) {
      fail.push(i);
    }
    if (data.length >= limit) {
      return data;
    }
  }
};

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

exports.getResource = {
  'character': this.getProcessedCharacter,
  'starship': this.getProcessedStarship,
  'planet': this.getProcessedPlanet,
  'film': this.getProcessedFilm,
  'species': this.getProcessedSpecies
}

exports.getResourceFromAdapter = {
  'mongodb' : {
    'character': this.db_getCharacter,
    'starship': this.db_getStarship,
    'planet': this.db_getPlanet,
    'film': this.db_getFilm,
    'species': this.db_getSpecies
  },
  'web' : {
    'character': this.getCharacter,
    'starship': this.getStarship,
    'planet': this.getPlanet,
    'film': this.getFilm,
    'species': this.getSpecies
  }
}