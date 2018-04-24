// const proxy = require('express-http-proxy');
// const apiKey = process.env.API_KEY;
// const request = require('request');
//
//
// const getBreweryDBResponse = (res, term, body) => {
//
//   let breweryDBResponse = [];
//
//     request({'http://api.brewerydb.com/v2/search/?beerId&key=e2cf6d182fcd977a76875b349ab92f69&q=moose'
//     // beerId: body.beerId
//   }).then(response => {
//     for(let i = 0; i < (response.jsonBody.beers).length; i++){
//       breweryDBResponse.push(
//         {
//           name: response.jsonBody.beers[i].name, description: response.jsonBody.beers[i].description, style: response.jsonBody.beers[i].style.name}
//       )
//     }
//     console.log(breweryDBResponse);
//     res.send(breweryDBResponse)
//   }).catch(e => {
//     console.log(e);
//   });
//
// module.exports = getBreweryDBResponse;
