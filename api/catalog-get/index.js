//const data = require('../shared/catalog-data');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;

const executeSQL = (context) => {
	
	// Create Connection object
    const connection = new Connection({
        server: 'coldstartchallenge.database.windows.net',
        authentication: {
            type: 'default',
            options: {
                userName: 'neal',
                password: 'AzureAzure123',
            }
        },
        options: {
            database: 'ColdStartChallenge',
            encrypt: true
        }
    });
	
	// Create the command to be executed
    const request = new Request('SELECT * FROM icecreams FOR JSON PATH;', (err) => {
        if (err) {
            context.log.error(err);            
            context.res.status = 500;
            context.res.body = "Error executing T-SQL command";
        } else {
            context.res = {
                body: result
            }   
        }
        context.done();
    });
	
	// Connect
    connection.connect();
	connection.execSql(request);
	
}

module.exports = function (context, req) {
  try {
	  
	  executeSQL(context);
	  
    const items = await data.getCatalog();
    context.res.status(200).send(items);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
