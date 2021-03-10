//const data = require('../shared/catalog-data');

// var Connection = require('tedious').Connection;
// var Request = require('tedious').Request
// var TYPES = require('tedious').TYPES;

// const executeSQL = (context) => {
	
	// // Create Connection object
    // const connection = new Connection({
        // server: 'coldstartchallenge.database.windows.net',
        // authentication: {
            // type: 'default',
            // options: {
                // userName: 'neal',
                // password: 'AzureAzure123',
            // }
        // },
        // options: {
            // database: 'ColdStartChallenge',
            // encrypt: true
        // }
    // });
	
	// // Create the command to be executed
    // const request = new Request('SELECT * FROM icecreams FOR JSON PATH;', (err) => {
        // if (err) {
            // context.log.error(err);            
            // context.res.status = 500;
            // context.res.body = "Error executing T-SQL command";
        // } else {
            // context.res = {
                // body: result
            // }   
        // }
        // context.done();
    // });
	
	// // Connect
    // connection.connect();
	// connection.execSql(request);
	
// }

module.exports = function (context, req) {
  try {
	  
	  //executeSQL(context);
	  
		  // context.res.body = '{
		// "icecreams": [
			// {
				// "Id": 1,
				// "Name": "Color Pop",
				// "Description": "Delicious 4-color popsicle, plenty of vitamins.",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream1.png"
			// },
			// {
				// "Id": 2,
				// "Name": "Lemoncella",
				// "Description": "Refreshing lemon-flavoured icecream bar.",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream2.png"
			// },
			// {
				// "Id": 3,
				// "Name": "Pink Panther",
				// "Description": "Fruity ice cream bar with hints of strawberry and lime.",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream3.png"
			// },
			// {
				// "Id": 4,
				// "Name": "Choco Chique",
				// "Description": "Filled with praline and covered with the finest Belgian chocolate.",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream4.png"
			// },
			// {
				// "Id": 5,
				// "Name": "Blue Lagoon",
				// "Description": "Blueberry and melon ice cream bar.",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream5.png"
			// },
			// {
				// "Id": 6,
				// "Name": "Purple Rain",
				// "Description": "Indulging strawberry and vodka icecream bar.",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream6.png"
			// },
			// {
				// "Id": 7,
				// "Name": "Sorbonne",
				// "Description": "Strawberry and raspberry sorbet.",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream7.png"
			// },
			// {
				// "Id": 8,
				// "Name": "Sandstorm",
				// "Description": "Chocolate and vanille ice cream cookie (3).",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream8.png"
			// },
			// {
				// "Id": 9,
				// "Name": "Maxi jazz",
				// "Description": "Dame Blanche flavoured ice cream cake (6p).",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream9.png"
			// },
			// {
				// "Id": 10,
				// "Name": "Triplets",
				// "Description": "Surprise yourself with a random selection of 3 different flavors.",
				// "ImageUrl": "https://coldstartsa.blob.core.windows.net/web/assets/Icecream10.png"
			// }
		// ]
	// }';

	context.res = {
        body: "Neal result"
    };
    context.done();
	  
    // const items = await data.getCatalog();
    // context.res.status(200).send(items);
	
  } catch (error) {
    context.res.status(500).send(error);
  }
};
