const Alexa = require('ask-sdk-core');
const AWS = require("aws-sdk");

const username = "chris";
const password = "asd123";
const key = "ThisIsTheKeyForAlexa";

 const AddProductIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AddProductIntent';
  },
  async handle(handlerInput) {
    let outputSpeech = "";
    
    await getRemoteData(`https://sholi.server-welt.com/php/alexa/login.php?key=${key}&username=${username}&password=${password}`);
    
    let jwt;
    await getRemoteData(`https://sholi.server-welt.com/php/alexa/tokens/${username}.json`)
        .then((response) => {
            jwt = JSON.parse(response);
        });
    
    let productName = handlerInput.requestEnvelope.request.intent.slots.productName.value;
    let listName = handlerInput.requestEnvelope.request.intent.slots.listName.value;
    let timestamp = handlerInput.requestEnvelope.request.timestamp;
    
    await getRemoteData(`https://sholi.server-welt.com/php/alexa/addProductToList.php?product=${productName}&list=${listName}&jwt=${jwt}&key=${key}&timestamp=${timestamp}`);
    await getRemoteData(`https://sholi.server-welt.com/php/alexa/responses/${timestamp}.txt`)
        .then((response) => {
            if ("1".localeCompare(response) === 0) {    
              outputSpeech = `Ich habe ${productName} zur Liste ${listName} hinzugefügt.`;
            }
            else {
                outputSpeech = `Ich konnte leider ${productName} nicht zur Liste ${listName} hinzufügen.`;
            }
        });    
    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse(); 
  }
      
};


const DeleteProductIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DeleteProductIntent';
  },
  async handle(handlerInput) {
    let outputSpeech = "";
    
    await getRemoteData(`https://sholi.server-welt.com/php/alexa/login.php?key=${key}&username=${username}&password=${password}`);
    
    let jwt;
    await getRemoteData(`https://sholi.server-welt.com/php/alexa/tokens/${username}.json`)
        .then((response) => {
            jwt = JSON.parse(response);
        });
    
    let productName = handlerInput.requestEnvelope.request.intent.slots.productName.value;
    let listName = handlerInput.requestEnvelope.request.intent.slots.listName.value;
    let timestamp = handlerInput.requestEnvelope.request.timestamp;
    
    await getRemoteData(`https://sholi.server-welt.com/php/alexa/deleteProductFromList.php?product=${productName}&list=${listName}&jwt=${jwt}&key=${key}&timestamp=${timestamp}`);
    await getRemoteData(`https://sholi.server-welt.com/php/alexa/responses/${timestamp}.txt`)
        .then((response) => {
            if ("1".localeCompare(response) === 0) {    
              outputSpeech = `Ich habe ${productName} aus der Liste ${listName} entfernt.`;
            }
            else {
                outputSpeech = `Ich konnte leider ${productName} nicht aus der Liste ${listName} entfernen.`;
            }
        });    
    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse(); 
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Wie ist dein name?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Tschau!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Die Session wurde mit folgender Fehlermeldung beendet: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error behandelt: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(`${error.message}`)
      .reprompt('Ich weiß nicht, was du damit meinst, bitte versuche es erneut.')
      .getResponse();
  },
};

const getRemoteData = (url) => new Promise((resolve, reject) => {
  const client = url.startsWith('https') ? require('https') : require('http');
  const request = client.get(url, (response) => {
    if (response.statusCode < 200 || response.statusCode > 299) {
      reject(new Error(`Beendet mit folgender Fehlermeldung: ${response.statusCode}`));
    }
    const body = [];
    response.on('data', (chunk) => body.push(chunk));
    response.on('end', () => resolve(body.join('')));
  });
  request.on('error', (err) => reject(err));
});

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    AddProductIntentHandler, 
    DeleteProductIntentHandler, 
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
 
 