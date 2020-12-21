const mocha = require('mocha');
const chai = require('chai');

let data = require('../../db/data-adapter');
let person = 1;
let timeout = 60000;

//Get by ID;

describe('getCharacter', function () {
  it('should return person object', async function () {
    let query = {
      resourceType: 'character',
      id: 1
    }
    let result = await data.findById( query )
    console.log( JSON.stringify( result.data ));
    chai.expect(result.status).to.equal(200);
  });
});