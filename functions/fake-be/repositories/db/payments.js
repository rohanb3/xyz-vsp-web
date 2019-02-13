const { firestore } = require('../../../firebaseApp');
const {
  getCollectionSize,
  getQuerySnapshotItems,
  insertElementsToCollection,
  deleteCollection,
} = require('./utils');

const collection = firestore.collection('payments');

function getAllPayments() {
  return collection
    .orderBy('date')
    .get()
    .then(getQuerySnapshotItems);
}

function getPaymentsRange(startFrom, count) {
  return getAllPayments().then(payments => payments.slice(startFrom, startFrom + count));
}

function getPaymentsLength() {
  return getCollectionSize(collection);
}

function insertPayments(payments = []) {
  return insertElementsToCollection(collection, payments);
}

function deleteAllPayments() {
  return deleteCollection(collection, 10);
}

exports.getAllPayments = getAllPayments;
exports.getPaymentsRange = getPaymentsRange;
exports.getPaymentsLength = getPaymentsLength;
exports.insertPayments = insertPayments;
exports.deleteAllPayments = deleteAllPayments;
