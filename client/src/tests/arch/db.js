const mocha = require('mocha');
const chai = require('chai');
const db = require('../../functions/data/data-adapter');
let timeout = 60000;

let character = {
  "resourceType": "character",
  "api_id":"3",
  "name": "R2-D2",
  "height": "96",
  "mass": "32",
  "hair_color": "n/a",
  "skin_color": "white, blue",
  "eye_color": "red",
  "birth_year": "33BBY",
  "gender": "n/a",
  "homeworld": "http://swapi.dev/api/planets/8/",
  "films": [
    "http://swapi.dev/api/films/1/",
    "http://swapi.dev/api/films/2/",
    "http://swapi.dev/api/films/3/",
    "http://swapi.dev/api/films/4/",
    "http://swapi.dev/api/films/5/",
    "http://swapi.dev/api/films/6/"
  ],
  "species": [
    "http://swapi.dev/api/species/2/"
  ],
  "vehicles": [],
  "starships": [],
  "created": "2014-12-10T15:11:50.376000Z",
  "edited": "2014-12-20T21:17:50.311000Z",
  "url": "http://swapi.dev/api/people/3/"
};

let species = {
  "resourceType": "species",
  "api_id" : "3",
	"name": "Wookie",
	"classification": "mammal",
	"designation": "sentient",
	"average_height": "210",
	"skin_colors": "gray",
	"hair_colors": "black, brown",
	"eye_colors": "blue, green, yellow, brown, golden, red",
	"average_lifespan": "400",
	"homeworld": "http://swapi.dev/api/planets/14/",
	"language": "Shyriiwook",
	"people": [
		"http://swapi.dev/api/people/13/",
		"http://swapi.dev/api/people/80/"
	],
	"films": [
		"http://swapi.dev/api/films/1/",
		"http://swapi.dev/api/films/2/",
		"http://swapi.dev/api/films/3/",
		"http://swapi.dev/api/films/6/"
	],
	"created": "2014-12-10T16:44:31.486000Z",
	"edited": "2014-12-20T21:36:42.142000Z",
	"url": "http://swapi.dev/api/species/3/"
};
let film = {
  "resourceType": "film",
  "api_id" : "3",
	"title": "Return of the Jedi",
	"episode_id": 6,
	"opening_crawl": "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
	"director": "Richard Marquand",
	"producer": "Howard G. Kazanjian, George Lucas, Rick McCallum",
	"release_date": "1983-05-25",
	"characters": [
		"http://swapi.dev/api/people/1/",
		"http://swapi.dev/api/people/2/",
		"http://swapi.dev/api/people/3/",
		"http://swapi.dev/api/people/4/",
		"http://swapi.dev/api/people/5/",
		"http://swapi.dev/api/people/10/",
		"http://swapi.dev/api/people/13/",
		"http://swapi.dev/api/people/14/",
		"http://swapi.dev/api/people/16/",
		"http://swapi.dev/api/people/18/",
		"http://swapi.dev/api/people/20/",
		"http://swapi.dev/api/people/21/",
		"http://swapi.dev/api/people/22/",
		"http://swapi.dev/api/people/25/",
		"http://swapi.dev/api/people/27/",
		"http://swapi.dev/api/people/28/",
		"http://swapi.dev/api/people/29/",
		"http://swapi.dev/api/people/30/",
		"http://swapi.dev/api/people/31/",
		"http://swapi.dev/api/people/45/"
	],
	"planets": [
		"http://swapi.dev/api/planets/1/",
		"http://swapi.dev/api/planets/5/",
		"http://swapi.dev/api/planets/7/",
		"http://swapi.dev/api/planets/8/",
		"http://swapi.dev/api/planets/9/"
	],
	"starships": [
		"http://swapi.dev/api/starships/2/",
		"http://swapi.dev/api/starships/3/",
		"http://swapi.dev/api/starships/10/",
		"http://swapi.dev/api/starships/11/",
		"http://swapi.dev/api/starships/12/",
		"http://swapi.dev/api/starships/15/",
		"http://swapi.dev/api/starships/17/",
		"http://swapi.dev/api/starships/22/",
		"http://swapi.dev/api/starships/23/",
		"http://swapi.dev/api/starships/27/",
		"http://swapi.dev/api/starships/28/",
		"http://swapi.dev/api/starships/29/"
	],
	"vehicles": [
		"http://swapi.dev/api/vehicles/8/",
		"http://swapi.dev/api/vehicles/16/",
		"http://swapi.dev/api/vehicles/18/",
		"http://swapi.dev/api/vehicles/19/",
		"http://swapi.dev/api/vehicles/24/",
		"http://swapi.dev/api/vehicles/25/",
		"http://swapi.dev/api/vehicles/26/",
		"http://swapi.dev/api/vehicles/30/"
	],
	"species": [
		"http://swapi.dev/api/species/1/",
		"http://swapi.dev/api/species/2/",
		"http://swapi.dev/api/species/3/",
		"http://swapi.dev/api/species/5/",
		"http://swapi.dev/api/species/6/",
		"http://swapi.dev/api/species/8/",
		"http://swapi.dev/api/species/9/",
		"http://swapi.dev/api/species/10/",
		"http://swapi.dev/api/species/15/"
	],
	"created": "2014-12-18T10:39:33.255000Z",
	"edited": "2014-12-20T09:48:37.462000Z",
	"url": "http://swapi.dev/api/films/3/"
};

let starship = {
  "resourceType": "starship",
  "api_id": "3",
	"name": "Star Destroyer",
	"model": "Imperial I-class Star Destroyer",
	"manufacturer": "Kuat Drive Yards",
	"cost_in_credits": "150000000",
	"length": "1,600",
	"max_atmosphering_speed": "975",
	"crew": "47,060",
	"passengers": "n/a",
	"cargo_capacity": "36000000",
	"consumables": "2 years",
	"hyperdrive_rating": "2.0",
	"MGLT": "60",
	"starship_class": "Star Destroyer",
	"pilots": [],
	"films": [
		"http://swapi.dev/api/films/1/",
		"http://swapi.dev/api/films/2/",
		"http://swapi.dev/api/films/3/"
	],
	"created": "2014-12-10T15:08:19.848000Z",
	"edited": "2014-12-20T21:23:49.870000Z",
	"url": "http://swapi.dev/api/starships/3/"
};
let planet = {
  "resourceType": "planet",
  "api_id": "3",
	"name": "Yavin IV",
	"rotation_period": "24",
	"orbital_period": "4818",
	"diameter": "10200",
	"climate": "temperate, tropical",
	"gravity": "1 standard",
	"terrain": "jungle, rainforests",
	"surface_water": "8",
	"population": "1000",
	"residents": [],
	"films": [
		"http://swapi.dev/api/films/1/"
	],
	"created": "2014-12-10T11:37:19.144000Z",
	"edited": "2014-12-20T20:58:18.421000Z",
	"url": "http://swapi.dev/api/planets/3/"
};

describe('createResource', function () {
  it('should create character object', async function () {
    this.timeout(timeout);
    await awaitConnection();
    let result = await db.createResource( character );
    chai.expect(result).to.exist;
  });
});

describe('createResource', function () {
  it('should create planet object', async function () {
    this.timeout(timeout);
    await awaitConnection();
    let result = await db.createResource( planet );
    chai.expect(result).to.exist;
  });
});

describe('createResource', function () {
  it('should create starship object', async function () {
    this.timeout(timeout);
    await awaitConnection();
    let result = await db.createResource( starship );
    chai.expect(result).to.exist;
  });
});

describe('createResource', function () {
  it('should create species object', async function () {
    this.timeout(timeout);
    await awaitConnection();
    let result = await db.createResource( species );
    chai.expect(result).to.exist;
  });
});

describe('createResource', function () {
  it('should create film object', async function () {
    this.timeout(timeout);
    await awaitConnection();
    let result = await db.createResource( film );
    chai.expect(result).to.exist;
  });
});


let awaitConnection = async () => {
  let mongoose = require('mongoose');
  while( mongoose.connection.readyState !== 1 ){
    console.log(mongoose.connection.readyState);
    await sleep();
  }
  return;
}

const sleep = (ts) => {
  ts = ts ? ts : 2000;
  return new Promise((resolve,reject)=>{
    try{
      setTimeout(()=>{
        resolve();
      }, ts )
    }catch( err ){
      reject( err );
    }
  })
}

