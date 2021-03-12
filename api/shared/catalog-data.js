const { Connection, Request } = require("tedious");

async function getCatalog() {
  return new Promise((resolve, reject) => {
    
	const conn = new Connection({
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
      `SELECT Id, Name, Description, ImageUrl FROM Icecreams`,
      (err, rowCount) => {
        if (err) { 
          reject(err);
        }
        else {
          resolve(result);
        }
  });

  request.on("row", columns => {
    
    const data = {};
    columns.forEach(column => {
      data[column.metadata.colName] = column.value;
    });
	
    result.push(data);
  });

  conn.on("connect", err => {
    if (err) {
      reject(err);
    } else {
      conn.execSql(request);
    }
  });
  
  conn.connect();
  
});
}

module.exports = { getCatalog };
