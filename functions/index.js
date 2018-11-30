const functions = require('firebase-functions');

const fakeBeApp = require('./fake-be');

const fakeBe = functions.https.onRequest(fakeBeApp);

module.exports = {
  fakeBe,
};
