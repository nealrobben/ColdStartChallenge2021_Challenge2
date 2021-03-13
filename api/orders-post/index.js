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
	
	 request = new Request('INSERT INTO Orders (User, Date, IcecreamId, DriverId, FullAddress, LastPosition) OUTPUT INSERTED.Id VALUES (@User, @Date, @IcecreamId, @DriverId, @FullAddress, @LastPosition);',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            callback(null, '', '');
        }
     });
	 
    request.addParameter('User', TYPES.NVarChar, user.userdetails);
    request.addParameter('Date', TYPES.Date, new Date());
	request.addParameter('IcecreamId', TYPES.Int, req.body.Id);
	request.addParameter('DriverId', TYPES.Int, null);
	request.addParameter('FullAddress', TYPES.Int, req.body.ShippingAddress);
	request.addParameter('LastPosition', TYPES.Int, null);

    // Execute SQL statement
    
	//connection.execSql(request);
	
	//Insert(user.userDetails, new Date(), req.body.Id, "New", null, req.body.ShippingAddress, null, null);

    context.res.status(201).json({});
    context.done();
	
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};
