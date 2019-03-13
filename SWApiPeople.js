
var axios = require('axios');

var SWApi = require('./SWApi');

var { getTabbing } = require('./helpers');

module.exports = class SWApiPlanets extends SWApi {
  constructor() {
    super("https://swapi.co/api/people/");
  }

  queryAndPrint() {
    this.queryAll(this.printPeople.bind(this));
  }

  printPeople() {
    console.log("PERSON\t\t\t GENDER");
    console.log("------\t\t\t ------");

    this.objects.forEach(person => {
      //console.log(person);
      console.log(person.name, getTabbing(person.name), person.gender);
      //console.log(planet.name, getTabbing(planet.name), readablePopulation(planet));
    });
  }
}
