const { getUser } = require('../shared/user-utils');
const { getPersonalizerClient } = require('../shared/personalizer');

const { Connection, Request, TYPES } = require("tedious");

module.exports = function (context, req) {
  
   await scoreReward(req.body.eventId,req.body.Id,req.body.recIcecreamId);
  
  var user = {};
  
  const header = req.headers["x-ms-client-principal"];
    if (header != undefined) {
        const encoded = Buffer.from(header, "base64");
        const decoded = encoded.toString("ascii");

        user = JSON.parse(decoded);
    } else {
        user = { userDetails: "John Doe" };
    }

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
	
	 var request = new Request('INSERT INTO Orders ([User], Date, IcecreamId, FullAddress) OUTPUT INSERTED.Id VALUES (@myUser, @Date, @IcecreamId, @FullAddress);',
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
	 
    request.addParameter('myUser', TYPES.NVarChar, user.userDetails);
    request.addParameter('Date', TYPES.Date, new Date());
	request.addParameter('IcecreamId', TYPES.Int, req.body.Id);
	request.addParameter('FullAddress', TYPES.NVarChar, req.body.ShippingAddress);

    // Execute SQL statement
	conn.on("connect", err => {
    if (err) {
      context.log(err);
	  context.res.status(500).send(err);
	  context.done();
    } else {
      conn.execSql(request);
    }
  });
  
	conn.connect();
	
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};

async function scoreReward(eventId, recId, icecreamId) {
  //const personalizerClient = getPersonalizerClient();
  //const reward = (recId == icecreamId) ? 1 : 0;
  //await personalizerClient.events.reward(eventId, {value: reward});
}
