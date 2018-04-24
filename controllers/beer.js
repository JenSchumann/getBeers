const proxy = require('express-http-proxy');
const express = require('express');
const router = express.Router();

const apiKey = process.env.API_KEY;
const request = require('request');

const Beer = require('../models/beer.js');
// const getBreweryDBResponse = require('../bin/breweryDB.js');

// 3rd party apis need to be accessed through a proxy
// if this is deleted requests to brewerydb will fail
router.use('/proxy', proxy('api.brewerydb.com' ,{
  proxyReqPathResolver: function(req) {
    var newUrl = require('url').parse(req.url).path;
    var connector = newUrl.includes("?") ? "&" : "?";
    return newUrl + connector + "key=" + apiKey
  }
}))

// router.use('/proxy', proxy('api.brewerydb.com', {
//   filter: function(req, res) {
//      return req.method == 'GET';
//   }
// }));

router.post('/', function(req, res){
  console.log('create new Beer', req.body);
  Beer.create(req.body, function (err, createdBeer){
    res.json(createdBeer);
  });
});

//beers index page : for testing purpose
router.get('/', function(req, res){
    res.send('List all beers here');
  });
// });


// BreweryDB Response route ========================
// router.post('/getBreweryDBResponse', (req, res) =>
//  {
//   console.log('req.body: ', req.body);
//   getBreweryDBResponse(res, req.body, req.body);
//
// });


module.exports  = router;
