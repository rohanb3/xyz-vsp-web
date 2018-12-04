const admin = require('firebase-admin');

admin.initializeApp();

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

exports.app = admin;
exports.storage = admin.storage();
exports.firestore = firestore;
