const mocha = require('mocha');
const chai = require('chai');

let data = require('../../functions/orchestration/data');
let person = 1;
let timeout = 60000;

//Get by ID;

describe('getCharacter', function () {
  it('should return person object', async function () {
    let result = await data.getResource['character'](1);
    console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});

describe('getStarship', function () {
  it('should return starship object', async function () {
    let result = await data.getResource['starship'](2);
    console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});

describe('getFilm', function () {
  it('should return film object', async function () {
    let result = await data.getResource['film'](1);
    console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});

describe('getPlanet', function () {
  it('should return planet object', async function () {
    let result = await data.getResource['planet'](1);
    console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});

//Get by URL

describe('getCharacter', function () {
  it('should return person object', async function () {
    let result = await data.getResource['character']('https://swapi.dev/api/people/22/');
    //console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});

describe('getStarship', function () {
  it('should return starship object', async function () {
    let result = await data.getResource['starship']('https://swapi.dev/api/starships/2/');
    //console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});

describe('getFilm', function () {
  it('should return film object', async function () {
    let result = await data.getResource['film']('https://swapi.dev/api/films/2/');
    //console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});

describe('getPlanet', function () {
  it('should return planet object', async function () {
    let result = await data.getResource['planet']('https://swapi.dev/api/planets/2/');
    //console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});

/// errors

describe('getStarship failure', function () {
  it('should return starship object', async function () {
    try{
      let result = await data.getResource['starship']('https://swapi.dev/api/starships/1/');
    }catch(err){
      chai.expect(err.response.status).to.equal(404);
    }
  });
});