const proxy = require('express-http-proxy');
const apiKey = process.env.API_KEY;
// const client = breweryDB.client(apiKey);

let getBreweryDBResponse = (res, beer, body) => {

  let breweryDBResponse = [];

  client.search({
    beers: body.beers
  }).then(response =>
    // {
    // for(let i = 0; i < (response.jsonBody.beers).length; i++) {
    //   breweryDBResponse.push (
    //     name: response.jsonBody.beers[i].name,
    //     description: response.jsonBody.beers[i].description,
    //     style: response.jsonBody.beers[i].style,
    //     abv: response.jsonBody.beers[i].abv,
    //     ibu: response.jsonBody.beers[i].ibu,
    //     brewery: response.jsonBody.beers[i].brewery
    //   )
    // }
    console.log(breweryDBResponse));
        res.send(breweryDBResponse);
          // }.catch(e => {
          //   console.log(e);
          // });
}

module.exports = getBreweryDBResponse;
