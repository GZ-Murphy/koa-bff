

const glob =require('glob');
const path =require('path');
const compose =require('koa-compose');

//We need to convert list of separated route in to the one
//The block below does dynamic import all routers inside current directory.
let routers = [];
glob.sync( path.join(__dirname,'router-*.js') ).forEach( function( file ) {
  let r = require( path.resolve( file ) );
  routers.push(r);
});

//So we extract the middelware from router
let middleware = [];
routers.forEach((router) => {
  middleware.push(router.routes())
  middleware.push(router.allowedMethods())
});

const composeRouter = compose(middleware);
module.exports = composeRouter;
