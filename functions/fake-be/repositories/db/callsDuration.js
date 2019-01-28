const { firestore } = require('../../../firebaseApp');
const { insertElementsToCollection, deleteCollection, getQuerySnapshotItems } = require('./utils');

const collection = firestore.collection('callsDuration');

function getAllCallsDuration() {
  return collection
    .orderBy('order')
    .get()
    .then(getQuerySnapshotItems);
}

function insertCallsDuration(operators = []) {
  return insertElementsToCollection(collection, operators);
}

function deleteAllCallsDuration() {
  return deleteCollection(collection, 10);
}

exports.getAllCallsDuration = getAllCallsDuration;
exports.insertCallsDuration = insertCallsDuration;
exports.deleteAllCallsDuration = deleteAllCallsDuration;
