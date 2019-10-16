
const Base64 = require('js-base64').Base64;

module.exports = function () {
  return async  function getAccessTokenClaimsObj (ctx, next) {
    const bearerToken = ctx.headers.authorization
    const accessToken = bearerToken.replace(/^Bearer /, '');
    ctx.state.claimsObj =  parseAccessTokenClaimsObj(accessToken);
     await next();
  }
}

function padBase64(base64data) {
  while (base64data.length % 4 !== 0) {
      base64data += "=";
  }
  return base64data;
}




function parseAccessTokenClaimsObj(accessToken) {
  const _accessToken = accessToken 
  const accClaimsBase64 = Base64.decode(padBase64(_accessToken.split('.')[1]));
 return JSON.parse(accClaimsBase64);
}