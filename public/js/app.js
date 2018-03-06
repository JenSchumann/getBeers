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
        // for(let i = 0; i < (response.data).length; i++){
        //   name: response.data[i].name,
        //   description: response.data[i].description,
        //   style: response.data[i].style.shortName,
        //   abv: response.data[i].abv,
        //   ibu: response.data[i].ibu,
        // }

        controller.breweryDBBeer = response.data;

        controller.breweryDBBeerName = '';
      },
      function(error){
        console.log(error);
      }
    )
  }

  this.getBeer =function(){

    $http({
      method: 'GET',
      url: '/beer'
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
