const proxy = require('express-http-proxy');
const apiKey = process.env.API_KEY;
const request = require('request');

const getBreweryDBResponse = (res, beer) => {

  let breweryDBResponse = [];

  const responseToClient = (res, data) => {
    res.send(data)
  }

// request("http://api.brewerydb.com/v2/?key=" + apiKey,
    request("http://api.brewerydb.com/v2/?key=" + apiKey + beers,
     function(error, response, body) {

      const parsedBody = JSON.parse(body)
      responseToClient(res, body)
      console.log(parsedBody.description, parsedBody.name);
      console.log(parsedBody);
    });
  }

module.exports = getBreweryDBResponse;
