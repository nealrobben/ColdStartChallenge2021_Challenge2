const { getUser } = require('../shared/user-utils');
//var uuid = require('uuid');

const { Connection, TYPES } = require("tedious");

module.exports = async function (context, req) {
  
  // Get the user details from the request
  const user = getUser(req);

  // build the pre-order json from the request
  const order = {
    //id: uuid.v4(),
    user: user.userdetails,
    fulladdress: req.body.shippingaddress,
    date: new date().toisostring(),
    icecreamid: req.body.id,
    status: "new",
    driverid: null,
    lastposition: null
  };

  try {
    
	Insert(user.userDetails, new Date().toISOString(), req.body.Id, "New", null, req.body.ShippingAddress, null, null);

    context.res.status(201).json(order);
    context.done();
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};

function Insert(user, date, icecreamId, myStatus, driverId, fullAddress, lastPosition, callback) {
    
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

    request = new Request(
        'INSERT INTO Orders (User, Date, IcecreamId, DriverId, FullAddress, LastPosition) OUTPUT INSERTED.Id VALUES (@User, @Date, @IcecreamId, @DriverId, @FullAddress, @LastPosition);',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            callback(null, '', '');
        }
        });
    request.addParameter('User', TYPES.NVarChar, user);
    request.addParameter('Date', TYPES.Date, date);
	request.addParameter('IcecreamId', TYPES.Int, icecreamId);
	request.addParameter('DriverId', TYPES.Int, driverId);
	request.addParameter('FullAddress', TYPES.Int, fullAddress);
	request.addParameter('LastPosition', TYPES.Int, lastPosition);

    // Execute SQL statement
    connection.execSql(request);
};
