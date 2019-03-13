#!/usr/bin/env node

var args = require('args');
var axios = require('axios');
var process = require('process');

var SWApiPlanets = require('./SWApiPlanets');
var SWApiPeople = require('./SWApiPeople');

args
  .option('planet', '[planetName] to find planet w/ residents, or lists all planets')
  .option('people', 'Lists all people')

const flags = args.parse(process.argv)

if (flags.planet === true) {
  let swapi = new SWApiPlanets();
  swapi.queryAndPrint();
} else if (flags.planet) {
  let swapi = new SWApiPlanets();
  swapi.find(flags.planet);
} else if (flags.people) {
  let swapi = new SWApiPeople();
  swapi.queryAndPrint();
} else {
  console.error("You must select one option");
}
