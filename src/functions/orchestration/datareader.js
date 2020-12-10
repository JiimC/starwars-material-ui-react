const axios = require('axios');
const _ = require('lodash');

let max_entries = 30;

exports.getProcessedResource = async ( identifier, type ) => {
  //console.log( `getProcessedResource ${type} ${identifier}` );
  type = type ? type : 'character';
  let resource = await this.getGenericResource( identifier, type );
  //console.log( `${ resource.data.name || resource.data.title } ${type} ${identifier}` );
  let api_id;
  let processedResource = _.cloneDeep( resource );
  api_id = validURL( identifier ) ? this.getIdentifierFromUrl( identifier ) : identifier;
  processedResource.data.api_id = api_id;
  processedResource.data.resourceType = type;
  return processedResource ;
}

exports.getGenericResource = async ( identifier, type ) => {

  let type_mapper = {
    'character': 'people',
    'film': 'films',
    'planet': 'planets',
    'starship': 'starships',
    'species': 'species'
  };

  type = ( !type || !type_mapper[type] ) ? 'people' : type_mapper[type];

  //console.log( `getGenericResource ${type} ${identifier}` );
  try {
    identifier = identifier.toString();
    let url;
    // check if the identifier is a valid url for the appropriate type
    let regexp = new RegExp(`/^http.+${type}/[0-9]+//`);
    if (
      identifier.match(regexp)
    ) {
      url = identifier;
    }
    if (
      identifier.match(/^\d+$/)
    ) {
      url = `https://swapi.dev/api/${type}/${identifier}/`
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
      //let result = await this.getResource[type](i);
      let result = await this.getProcessedResource(i,type);
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
