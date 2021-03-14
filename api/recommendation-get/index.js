const { v1: uuidv1 } = require('uuid');

const { getUser, getUserBrowser } = require('../shared/user-utils');

const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const Personalizer = require('@azure/cognitiveservices-personalizer');

module.exports = async function (context, req) {

  const credentials = new CognitiveServicesCredentials('bc7bed7850f04ca1b8de380c7b2e1fa4');
  const personalizerClient = new Personalizer.PersonalizerClient(credentials,'https://coldstartchallenge2personalizer.cognitiveservices.azure.com/');
  
  const actions = await loadActions();
  const rankRequest = {
    eventId: uuidv1(),
    contextFeatures: getContextFeatures(req),
    actions: actions,
    deferActivation: false
  };

  const rankResponse = await personalizerClient.rank(rankRequest);
  context.res.status(200).send({
    icecreamId: rankResponse.rewardActionId,
    eventId: rankResponse.eventId
  });
};

async function loadActions() {
  const icecreams = await getCatalog();
  return icecreams.map(ice => {
    return {
      id: `${ice.Id}`,
      features: [ { name: ice.Name } ]
    };
  });
}

function getContextFeatures(req) {
  let time = null;
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 7 || hour > 21) time = 'night';
  else if (hour >= 7 && hour < 12) time = 'morning';
  else if (hour < 17) time = 'day';
  else time = 'afternoon';

  const day = new Date().getDay();
  const loggedIn = getUser(req).userId ? true : false;
  const browser = getUserBrowser(req.headers['user-agent']);

  return [
    { time },
    { day },
    { loggedIn },
    { browser }
  ];
}

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