const mocha = require('mocha');
const chai = require('chai');
let data = require('../../functions/orchestration/data');
let max_entries = 50;
let results = [];
let filmresults = [];
let fail = [];
let timeout = 60000;

// describe('getAllCharacter', function () {
//   it('should return all person object', async function () {
//     this.timeout(timeout);
//     for( let i = 1; i < max_entries; i++  ){
//       try{
//         let result = await data.getResource['people'](i);
//         console.log(` ${result.data.name} ${i} `);
//         results.push( i );
//       }catch(err){
//         fail.push(i);
//       }
//     }
//     chai.expect(results.length).to.be.gt(5);
//     console.log( results );
//   });
// });

// describe('getAllStarships', function () {
//   it('should return all starship object', async function () {
//     this.timeout(timeout);
//     for( let i = 1; i < max_entries; i++  ){
//       try{
//         let result = await data.getResource['starship'](i);
//         console.log(` ${result.data.name} ${i} `);
//         results.push( i );
//       }catch(err){
//         fail.push(i);
//       }
//     }
//     chai.expect(results.length).to.be.gt(5);
//     console.log( results );
//   });
// });

// describe('getAllFilms', function () {
//   it('should return all film object', async function () {
//     this.timeout(timeout);
//     for( let i = 1; i < 7; i++  ){
//       try{
//         let result = await data.getResource['film'](i);
//         console.log(` ${result.data.title} ${i} `);
//         filmresults.push( i );
//       }catch(err){
//         fail.push(i);
//       }
//     }
//     chai.expect(filmresults.length).to.be.gt(5);
//     console.log( filmresults );
//   });
// });

// describe('getAllPlanets', function () {
//   it('should return all planet object', async function () {
//     this.timeout(timeout);
//     for( let i = 1; i < max_entries; i++  ){
//       try{
//         let result = await data.getResource['planet'](i);
//         console.log(` ${result.data.name} ${i} `);
//         results.push( i );
//       }catch(err){
//         fail.push(i);
//       }
//     }
//     chai.expect(results.length).to.be.gt(5);
//     console.log( results );
//   });
// });

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

describe('getRandomCharacters', function () {
  it('should return random character object', async function () {
    this.timeout(timeout);
    let result = await data.getRandomData('character',11);
    chai.expect(result.length).to.be.gt(5);
    //console.log( result );
  });
});

describe('getRandomFilms', function () {
  it('should return random film object', async function () {
    this.timeout(timeout);
    let result = await data.getRandomData('film',11);
    chai.expect(result.length).to.be.gt(5);
    //console.log( result );
  });
});

describe('getRandomPlanets', function () {
  it('should return random planet object', async function () {
    this.timeout(timeout);
    let result = await data.getRandomData('planet',11);
    chai.expect(result.length).to.be.gt(5);
    //console.log( result );
  });
});

describe('getRandomStarships', function () {
  it('should return random starship object', async function () {
    this.timeout(timeout);
    let result = await data.getRandomData('starship',11);
    chai.expect(result.length).to.be.gt(5);
    console.log( result );
  });
});
