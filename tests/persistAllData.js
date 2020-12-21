const mocha = require('mocha');
const chai = require('chai');
let data = require('../swapi-web/orchestration/datareader');
let db = require('../db/data-adapter');
let max_entries = 100;
let results = [];
let filmresults = [];
let fail = [];
let timeout = 60000;
let mongoose = require('mongoose');

describe('persistAllCharacter', function () {
  it('should persist all character objects', async function () {
    this.timeout(timeout);
    for( let i = 1; i < max_entries; i++  ){
      try{
        let result = await data.getProcessedResource( i, 'character' );
        //console.log( JSON.stringify(result) );
        let persisted = await db.createResource( result.data );
        results.push( persisted );
      }catch(err){
        fail.push(i);
      }
    }
    chai.expect(results.length).to.be.gt(5);
  });
});

describe('persistAllSpecies', function () {
  it('should persist all species objects', async function () {
    this.timeout(timeout);
    for( let i = 1; i < max_entries; i++  ){
      try{
        let result = await data.getProcessedResource( i, 'species' );
        //console.log( JSON.stringify(result) );
        let persisted = await db.createResource( result.data );
        results.push( persisted );
      }catch(err){
        fail.push(i);
      }
    }
    chai.expect(results.length).to.be.gt(5);
  });
});

describe('getAllStarships', function () {
  it('should return all starship object', async function () {
    this.timeout(timeout);
    for( let i = 1; i < max_entries; i++  ){
      try{
        let result = await data.getProcessedResource( i, 'starship' );
        console.log(` ${result.data.name} ${i} `);
        let persisted = await db.createResource( result.data );
        results.push( persisted );
      }catch(err){
        fail.push(i);
      }
    }
    chai.expect(results.length).to.be.gt(5);
    console.log( results );
  });
});

describe('getAllFilms', function () {
  it('should return all film object', async function () {
    this.timeout(timeout);
    for( let i = 1; i < 7; i++  ){
      try{
        let result = await data.getProcessedResource( i, 'film' );
        console.log(` ${result.data.title} ${i} `);
        let persisted = await db.createResource( result.data );
        filmresults.push( persisted );
      }catch(err){
        fail.push(i);
      }
    }
    chai.expect(filmresults.length).to.be.gt(5);
    console.log( filmresults );
  });
});

describe('getAllPlanets', function () {
  it('should return all planet object', async function () {
    this.timeout(timeout);
    for( let i = 1; i < max_entries; i++  ){
      try{
        let result = await data.getProcessedResource( i, 'planet' );
        console.log(` ${result.data.name} ${i} `);
        let persisted = await db.createResource( result.data );
        results.push( persisted );
      }catch(err){
        fail.push(i);
      }
    }
    chai.expect(results.length).to.be.gt(5);
    console.log( results );
  });
});

// describe('getAllPlanets', function () {
//   it('should return all planet object', async function () {
//     this.timeout(timeout);
//     let result = await data.getData('planet');
//     chai.expect(result.length).to.be.gt(5);
//     console.log( result );
//   });
// });

// describe('getAllCharacters', function () {
//   it('should return all character object', async function () {
//     this.timeout(timeout);
//     let result = await data.getData('character');
//     chai.expect(result.length).to.be.gt(5);
//     console.log( result );
//   });
// });

// describe('getAllStarships', function () {
//   it('should return all starship object', async function () {
//     this.timeout(timeout);
//     let result = await data.getData('starship');
//     chai.expect(result.length).to.be.gt(5);
//     console.log( result );
//   });
// });
