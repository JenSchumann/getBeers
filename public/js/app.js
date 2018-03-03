console.log('amber, saison, stout, or porter?');

const app = angular.module('BeerApp', []);

////////////////////////////////////////////////////////////

//BEER controller

////////////////////////////////////////////////////////////

app.controller('BeerDBController', ['$http', function($http){
  const controller = this;
  this.happyHour = "I'm going to a Careers & Beers networking event tonight that's about transitioning into a tech career; I wonder what they'll have on tap..";

  this.beers = [];
  this.selectedBeer = "";
  this.searchForBeer = "";

//=============================
  // Takes the results of a search and puts the data into objects that match
   // the mongo model. Adds the beers to the beer list.
   this.addFoundBeersToList = function(data) {
     for (var i = 0; i < data.length; i++ ) {
       var newBeer = {
         name: data[i].name,
         description: data[i].description,
         style: data[i].style.shortName,
         abv: data[i].abv,
         ibu: data[i].ibu,
         brewery: this.capWords( this.searchByBrewery)
       }
       controller.beers.push(newBeer);
     }
   }

   // Called when beer search form is submitted
   // Search by name has priority over search by brewery
   this.findBeer = function() {
     if (this.searchForBeer !== "") {
       this.searchByBrewery = ""
       this.getBeerByName();
     } else if (this.searchByBrewery !== "") {
       this.getBeersByBrewery();
     }
   }

   // Gets beer by name from brewerydb. Gets brewery that makes the beer.
   this.getBeerByName = function() {
     var urlStr = '/breweries/proxy/v2/beers?name=' + controller.searchForBeer;

     $http({
       method: 'GET',
       url: urlStr
     }).then( function(response) {
       controller.beers = [];

       // check if beer was found
       if (response.data.hasOwnProperty('data')) {
         controller.foundNoBeers = false;
       }
       else {
         controller.foundNoBeers = true;
         return;
       }

       controller.addFoundBeersToList(response.data.data);
       controller.getBreweryByBeerID(response.data.data[0].id);
       console.log(controller.beers);
     }, function(response) {
       console.log("Get beer by name failed", response);
       controller.beers = [];
     }
   )};

   this.goToThisBeer = function(breweryId, main){
       main.showBrewerySearch = false;
       main.showLoginForm = false;
       main.showHomePage = false;
       main.showBeerPage = false;
       main.showBreweryPage = false;
       main.showBreweries = false;
       BeerDisplayController.showDetailsForm = true;
    //   this.getBeerByName(breweryId);
    var urlStr = '/breweries/proxy/v2/beers?name=' + controller.searchForBeer;

    $http({
      method: 'GET',
      url: urlStr
    }).then( function(response) {
      controller.beers = [];
      // check if beer was found
      if (response.data.hasOwnProperty('data')) {
        controller.foundNoBeers = false;
        this.thisOneBeer = response;
        console.log(response);
      }
      else {
        controller.foundNoBeers = true;
        return;
      }
   });
  };

   // Get the brewery that makes the beer using the brewerydb beer id
   this.getBreweryByBeerID = function(beerID) {
     var urlStr = "/breweries/proxy/v2/beer/" + beerID + "/breweries";

     $http({
       method: 'GET',
       url: urlStr
     }).then( function(response) {
       if (response.data.hasOwnProperty('data') === true) {
         controller.beers[0].brewery = response.data.data[0].name;
       }
     }, function(response) {
       console.log("getBreweryByBeerID failed:", response);
     }
   )};


   // Get all of the beers that a brewery makes. Search by brewery name
   this.getBeersByBrewery = function() {
     controller.beers = [];
     var urlStr = "/breweries/proxy/v2/breweries?name=" + controller.searchByBrewery;

     $http({
       method: 'GET',
       url: urlStr
     }).then( function(response) {
       if (response.data.hasOwnProperty('data')) {
         controller.getBreweryBeers(response.data.data[0].id);
       }
     }, function(response) {
       console.log("getBeersByBrewery failed", response);
     })
   }

   // Get the beers a brewery makes. Search for brewery by breweryDB brewery id
   this.getBreweryBeers = function(breweryID) {
     var urlStr = "/breweries/proxy/v2/brewery/" + breweryID + "/beers";

     $http({
       method: 'GET',
       url: urlStr
     }).then(function(response) {
       if (response.data.hasOwnProperty('data')) {
         controller.foundNoBeers = false;
       } else {
         controller.foundNoBeers = true;
         return;
       }
       controller.addFoundBeersToList(response.data.data);
     }, function(response) {
       console.log("getBreweryBeers failed:", response);
     })
   }





}]); //end of BeerController
