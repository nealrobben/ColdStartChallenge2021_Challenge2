const fs = require('fs').promises;
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

async function getCatalog() {
  // console.log('using static data.');
  // var stringData = await fs.readFile('./shared/catalog.json', 'utf8');
  // const data = JSON.parse(stringData);
  // return data.icecreams;
  
  // Create connection to database
	var config = {
	  server: 'coldstartchallenge.database.windows.net',
	  authentication: {
		  type: 'default',
		  options: {
			  userName: 'neal', // update me
			  password: 'AzureAzure123' // update me
		  }
	  },
	  options: {
		database: 'ColdStartChallenge'
	  }
	}

	var connection = new Connection(config);
  
}

module.exports = { getCatalog };
