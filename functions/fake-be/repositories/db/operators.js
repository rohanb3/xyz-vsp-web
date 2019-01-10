const { firestore } = require('../../../firebaseApp');
const {
  insertElementsToCollection,
  deleteCollection,
  getCollectionSize,
  getQuerySnapshotItems,
} = require('./utils');

const collection = firestore.collection('operators');

function getAllOperators() {
  return collection
    .orderBy('score')
    .get()
    .then(getQuerySnapshotItems);
}

function getOperatorsRange(startFrom, count) {
  return getAllOperators().then(operators => operators.slice(startFrom, startFrom + count));
}

function getOperatorsLength() {
  return getCollectionSize(collection);
}

function getOperatorById(id) {
  return collection
    .doc(id)
    .get()
    .then(doc => doc.data());
}

function insertOperators(operators = []) {
  return insertElementsToCollection(collection, operators);
}

function deleteAllOperators() {
  return deleteCollection(collection, 10);
}

exports.getAllOperators = getAllOperators;
exports.getOperatorsRange = getOperatorsRange;
exports.getOperatorsLength = getOperatorsLength;
exports.getOperatorById = getOperatorById;
exports.insertOperators = insertOperators;
exports.deleteAllOperators = deleteAllOperators;
