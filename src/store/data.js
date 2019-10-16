const loki = require("lokijs");
const lfsa = require('lokijs/src/loki-fs-structured-adapter.js');

if(!metaDB){
  const adapter = new lfsa();
  var metaDB = new loki('src/store/db/data.db', { 
    adapter : adapter,
    autoload: true,
    autoloadCallback : databaseInitialize,
    autosave: true, 
    autosaveInterval: 4000
  });
  
}

function databaseInitialize() {
    const fields = metaDB.getCollection("data");

  if (fields === null) {
    metaDB.addCollection("data");
    // var tx = [
    //   {
    //     type: 'where',
    //     value: '[%lktxp]EntityTypeFilter'
    //   }
    // ];
    
    // metaDB.addTransform('ByFilteredEntityType', tx);
    
    // the following may then occur immediately or even across save/load cycles
    // this example uses anonymous function but this could be named function reference as well
  
  }

  // log some random event data as part of our example
  //field.insert({ event: 'dbinit', dt: (new Date()).getTime() });
}

module.exports = DB;