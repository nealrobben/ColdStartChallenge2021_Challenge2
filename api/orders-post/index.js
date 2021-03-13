const { getUser } = require('../shared/user-utils');
//var uuid = require('uuid');

const { Connection, Request, TYPES } = require("tedious");

module.exports = async function (context, req) {
   
  // Get the user details from the request
  const user = getUser(req);

  // build the pre-order json from the request
  // const order = {
    // //id: uuid.v4(),
    // user: user.userdetails,
    // fulladdress: req.body.ShippingAddress,
    // date: new Date().toISOString(),
    // icecreamid: req.body.Id,
    // status: "new",
    // driverid: null,
    // lastposition: null
  // };

  try {
    
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
	
	 var request = new Request('INSERT INTO Orders (User, Date, IcecreamId, FullAddress) OUTPUT INSERTED.Id VALUES (@User, @Date, @IcecreamId, @FullAddress);',
        function(err, rowCount, rows) {
        if (err) {
            context.log(err);
			context.res.status(500).send(err);
			context.done();
        } else {
            context.res.status(201).json({});
			context.done();
        }
     });
	 
    request.addParameter('User', TYPES.NVarChar, user.userdetails);
    request.addParameter('Date', TYPES.Date, new Date());
	request.addParameter('IcecreamId', TYPES.Int, req.body.Id);
	//request.addParameter('DriverId', TYPES.Int, null);
	request.addParameter('FullAddress', TYPES.NVarChar, req.body.ShippingAddress);
	//request.addParameter('LastPosition', TYPES.Int, null);

    // Execute SQL statement
	conn.execSql(request);
	
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};
