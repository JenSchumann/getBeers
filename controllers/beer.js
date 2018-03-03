const apiKey = process.env.API_KEY;
const request = require('request');
const proxy = require('express-http-proxy');
const express = require('express');
const router = express.Router();
const Beer = require('../models/beer.js'); // employee schema

// 3rd party apis need to be accessed through a proxy
// if this is deleted requests to brewerydb will fail
router.use('/proxy', proxy('api.brewerydb.com' ,{
  proxyReqPathResolver: function(req) {
    var newUrl = require('url').parse(req.url).path;
    var connector = newUrl.includes("?") ? "&" : "?";
    return newUrl + connector + apiKey
  }
}));

// router.use('/proxy', proxy('api.brewerydb.com', {
//   filter: function(req, res) {
//      return req.method == 'GET';
//   }
// }));

//beers index page : for testing purpose
router.get('/', function(req, res){
  res.send('List  All Beers here');
});





module.exports  = router;
