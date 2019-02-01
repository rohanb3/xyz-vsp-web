const { firestore } = require('../../../firebaseApp');
const { insertElementsToCollection, deleteCollection, getQuerySnapshotItems } = require('./utils');

const collection = firestore.collection('callsFeedback');

function getAllCallsFeedback() {
  return collection
    .orderBy('order')
    .get()
    .then(getQuerySnapshotItems);
}

function insertCallsFeedback(operators = []) {
  return insertElementsToCollection(collection, operators);
}

function deleteAllCallsFeedback() {
  return deleteCollection(collection, 10);
}

exports.getAllCallsFeedback = getAllCallsFeedback;
exports.insertCallsFeedback = insertCallsFeedback;
exports.deleteAllCallsFeedback = deleteAllCallsFeedback;
