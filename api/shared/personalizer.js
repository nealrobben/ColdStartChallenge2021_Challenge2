const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const Personalizer = require('@azure/cognitiveservices-personalizer');

const getPersonalizerClient = () => {
  const credentials = new CognitiveServicesCredentials('bc7bed7850f04ca1b8de380c7b2e1fa4');
  return new Personalizer.PersonalizerClient(credentials, 'https://coldstartchallenge2personalizer.cognitiveservices.azure.com/');
}

module.exports = { getPersonalizerClient }