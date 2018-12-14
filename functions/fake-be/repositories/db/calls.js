const { firestore } = require('../../../firebaseApp');
const {
  insertElementsToCollection,
  deleteCollection,
  getCollectionSize,
  getQuerySnapshotItems,
} = require('./utils');

const collection = firestore.collection('calls');

function getAllCalls() {
  return collection
    .orderBy('date', 'desc')
    .get()
    .then(getQuerySnapshotItems);
}

function getCallsRange(startFrom, count) {
  return getAllCalls().then(calls => calls.slice(startFrom, startFrom + count));
}

function getCallsLength() {
  return getCollectionSize(collection);
}

function insertCalls(calls = []) {
  return insertElementsToCollection(collection, calls);
}

function deleteAllCalls() {
  return deleteCollection(collection, 10);
}

exports.getAllCalls = getAllCalls;
exports.getCallsRange = getCallsRange;
exports.getCallsLength = getCallsLength;
exports.insertCalls = insertCalls;
exports.deleteAllCalls = deleteAllCalls;
