const axios = require('axios');
let max_entries = 30;

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

exports.getStarShip = async (identifier) => {
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

exports.getResource = {
  'character': this.getCharacter,
  'starship': this.getStarShip,
  'planet': this.getPlanet,
  'film': this.getFilm
}