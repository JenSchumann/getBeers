var mongoose = require('mongoose')

var beerSchema = mongoose.Schema({
  name: String,
  description: String,
  style: String
});


var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
