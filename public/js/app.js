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

  this.getBreweryDBResponse = function(){
    $http({
      method: 'POST',
      url: '/beer/getBreweryDBResponse',

      data: {
        name: this.breweryDBBeerName,

      }
    }).then(
      function(response){
        console.log('the button is working');
        for(let i = 0; i < (response.data).length; i++){
          response.data[i].name,
          response.data[i].description,
          response.data[i].style.shortName,
          response.data[i].abv,
          response.data[i].ibu
        }

        // controller.breweryDBBeers = response.data;
        controller.breweryDBResponse = response.data;

        controller.breweryDBBeerName = '';
      },
      function(error){
        console.log(error);
      }
    )
  }

  this.getBeer =function(){
    const urlStr = '/breweries/proxy/v2/beers?name='+controller.getBreweryDBResponse;

    $http({
      method: 'GET',
      url: urlStr
    }).then(
      function(response){
        controller.beer=response.data

      },
      function(error){

      }
    )
  }
  this.getBeer();
}]); //end of BeerController
