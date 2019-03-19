
var axios = require('axios');

var SWApi = require('./SWApi');

var { readableNumber, getTabbing, printAxiosError } = require('./helpers');

module.exports = class SWApiPlanets extends SWApi {
  constructor() {
    super("https://swapi.co/api/planets/");
  }

  async queryAndPrint() {
    try {
      await this.queryAll()

      console.log("PLANET\t\t\t POPULATION");
      console.log("------\t\t\t ----------");

      this.objects.forEach(planet => {
        console.log(planet.name, getTabbing(planet.name), readablePopulation(planet));
      });
    } catch (e) {
      printAxiosError(e);
    }
  }

  async find(name) {
    try {
      let foundPlanet = await super.find(planet => {
        return planet.name === name;
      })

      let allData = await Promise.all(foundPlanet.residents.map(url => axios.get(url)));

      let pop = readablePopulation(foundPlanet);
      let popStr = pop === "unknown" ? pop + " population" : pop + " people";
      console.log(foundPlanet.name, "[" + popStr + "]");

      allData.map(personRsp => {
        let person = personRsp.data;
        printPerson(person);
      });
    } catch (e) {
      console.error("Error finding planet");
    }
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
