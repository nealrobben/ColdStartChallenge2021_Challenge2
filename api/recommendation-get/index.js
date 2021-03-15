const { v1: uuidv1 } = require('uuid');
const { queryIcecreams } = require('../shared/database/queryIcecreams');

const { getUser, getUserBrowser } = require('../shared/user-utils');
const { getPersonalizerClient } = require('../shared/personalizer');

module.exports = async function (context, req) {
  const personalizerClient = getPersonalizerClient();
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
  const icecreams = await queryIcecreams();
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