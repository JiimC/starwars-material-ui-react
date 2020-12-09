
let data = require('../functions/orchestration/data');
let db = require('../functions/data/data-adapter');
let max_entries = 100;
let results = [];
let filmresults = [];
let fail = [];
let timeout = 60000;

const persistAllResources = async ( type ) => {
  for( let i = 1; i < max_entries; i++  ){
    try{
      let result = await data.getResource[type](i);
      let persisted = await db.createResource( result.data );
      console.log(` ${result.data.name} ${i} `);
      results.push( persisted );
    }catch(err){
      fail.push(i);
    }
  }
}

let types = ['film', 'character', 'starship', 'species', 'planet'];
let promises = types.map( type =>{
  return persistAllResources( type );
});

Promise.all( promises )
.catch( err => {
  console.log( err );
})

// persistAllResources()
// .catch( err => {
//   console.log( err );
// })
    
    
    
  