
let data = require('../../functions/orchestration/datareader');
let db = require('../../functions/data/data-adapter');
let max_entries = 100;
let results = [];
let filmresults = [];
let fail = [];
let timeout = 60000;

// const persistAllResources = async (type) => {
//   for (let i = 1; i < max_entries; i++) {
//     try {
//       let result = await data.getResource[type](i);
//       let persisted = await db.createResource(result.data);
//       results.push(persisted);
//     } catch (err) {
//       fail.push(i);
//     }
//   }
// }


// query = {
//   resourceType : 'character',
//   id: '5fd0b46d56e9718ee29655b2'
// }

// const queryMongoose = async ( query ) => {
//   return await db.findById( query );
// };

// queryMongoose( query )
// .then( res => {
//   console.log( JSON.stringify( res ));
// })


//let types = ['film', 'character', 'starship', 'species', 'planet'];
// let types = ['character'];
// let promises = types.map( type =>{
//   return persistAllResources( type );
// });

// Promise.all( promises )
// .catch( err => {
//   console.log( err );
// })

// persistAllResources()
// .catch( err => {
//   console.log( err );
// })

let getStuff = async function () {
  for (let i = 1; i < max_entries; i++) {
    try {
      let type = 'species';
      let result = await data.getProcessedResource(i,type);
      console.log(` ${result.data.name} ${i} `);
      results.push(i);
    } catch (err) {
      fail.push(i);
    }
  }
  console.log(results);
}

getStuff()
  .catch(err => {
    console.log(err);
  })
