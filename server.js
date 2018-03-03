//dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


//middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//controller
const beer = require('./controllers/beer.js');
  app.use('/beer', beer);


// Fixes mongoose promise deprecation warning
// mongoose.Promise = global.Promise;



//mongoose connection
mongoose.connect('mongodb://localhost:27017/getBeers');
mongoose.connection.once('open', function(){
  console.log('what do you have on draft?');
});



//port
app.listen(3000, function(){
  console.log("I'll take a Kilt Lifter please.");
});
