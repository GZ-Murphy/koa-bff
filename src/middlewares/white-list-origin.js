
const cors = require('kcors')
const CONFIG = require('../config')

function checkOriginAgainstWhitelist(ctx) {
   const requestOrigin = ctx.accept.headers.origin;
   if(CONFIG.WHITELIST.includes('*')){
     return '*';
   }
   if (!CONFIG.WHITELIST.includes(requestOrigin)) {
      if (requestOrigin.search(/(http|https)/) === 0) {
        return ctx.throw(`${requestOrigin} is not a valid origin`);
      } else { //allow if it is an application. not web page
        return null;
      }
   }
   return requestOrigin;
}

module.exports = cors({ 
  origin: checkOriginAgainstWhitelist 
});