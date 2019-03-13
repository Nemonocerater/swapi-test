
var axios = require('axios');

var SWApi = require('./SWApi');

var { readableNumber, getTabbing, printAxiosError } = require('./helpers');

module.exports = class SWApiPlanets extends SWApi {
  constructor() {
    super("https://swapi.co/api/planets/");
  }

  queryAndPrint() {
    this.queryAll(this.printPlanets.bind(this));
  }

  printPlanets() {
    console.log("PLANET\t\t\t POPULATION");
    console.log("------\t\t\t ----------");

    this.objects.forEach(planet => {
      console.log(planet.name, getTabbing(planet.name), readablePopulation(planet));
    });
  }

  find(name) {
    super.find(planet => {
      return planet.name === name;
    }, foundPlanet => {
      Promise.all(foundPlanet.residents.map(url => axios.get(url)))
      .then(allData => {
        console.log(foundPlanet.name, "[" + readablePopulation(foundPlanet) + " people]");
        allData.map(personRsp => {
          var person = personRsp.data;
          printPerson(person);
        });
      })
      .catch(error => {
        printAxiosError("Error fetching people for planet", error);
      });
    });
  }
}

function printPerson(person) {
  console.log("\t", person.name);
  (person.gender === "n/a")
    ? null : console.log("\t\t", person.gender);
  console.log("\t\t", "Birth year:", person.birth_year);
  (person.height === "unknown")
    ? null : console.log("\t\t", person.height, "cm");
  (person.mass === "unknown")
    ? null : console.log("\t\t", person.mass, "Kg");
  (person.hair_color === "none" || person.hair_color === "n/a")
    ? null : console.log("\t\t", person.hair_color, "hair");
  console.log("\t\t", person.eye_color, "eyes");
  console.log("\t\t", person.skin_color, "skin");
}

function readablePopulation(planet) {
  let pop = planet.population
  if (pop !== "unknown") {
    pop = readableNumber(parseInt(pop));
  }
  return pop;
}
