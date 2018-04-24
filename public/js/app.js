// console.log('amber, saison, stout, or porter?');

const app = angular.module('BeerApp', []);

////////////////////////////////////////////////////////////

//BEER controller

////////////////////////////////////////////////////////////

app.controller('BeerDBController', ['$http', function($http){
  const controller = this;
  this.beers = [];
  this.searchForBeer = "";

  // Called when beer search form is submitted
  this.findBeer = function() {

      this.getBeerByName();

  }

    // Gets beer by name from brewerydb
  this.getBeerByName = function() {
    var urlStr = '/?beerId/proxy/v2/q=' + controller.searchForBeer;

    $http({
      method: 'GET',
      url: urlStr,
    }).then( function(response) {
      controller.beers = response.data;
      // console.log(response);
      console.log(response);
      // check if beer was found
      if (response.data.hasOwnProperty('data')) {
        controller.foundNoBeers = false;
      }
      else {
        controller.foundNoBeers = true;
        return;
      }
     console.log(controller.beers);
   }, function(response) {
     console.log("getBeerByName error", response);
     controller.beers = [];
   }
 )};

 this.goToThisBeer = function(beerId,name){

   var urlStr = '/?beerId/proxy/v2/q=' + controller.searchForBeer;

   $http({
     method: 'GET',
     url: urlStr
   }).then( function(response) {
     controller.beers = [];
     console.log(reponse);
     console.log(controller.beers);

  });
 };

}]); //end of BeerController
