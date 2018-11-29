const functions = require('firebase-functions');

const app = require('./fake-be');

const api = functions.https.onRequest(app);

module.exports = {
  api,
};
