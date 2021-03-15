const { Connection, Request } = require("tedious");

async function queryIcecreams() {
  return new Promise((resolve, reject) => {

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
	
	const result = [];
    const request = new Request(
      `SELECT Id, Name, Description, ImageUrl FROM [dbo].[Icecreams]`,
      (err, rowCount) => {
        if (err) { 
          reject(err);
        }
        else {
          resolve(result);
        }
  });

  request.on("row", columns => {
    
    const iceCream = {};
    columns.forEach(column => {
      iceCream[column.metadata.colName] = column.value;
    });
    result.push(iceCream);
  });

  connection.on("connect", err => {
    if (err) {
      reject(err);
    } else {
      connection.execSql(request);
    }
  });
  connection.connect();
});
}

module.exports = { queryIcecreams };