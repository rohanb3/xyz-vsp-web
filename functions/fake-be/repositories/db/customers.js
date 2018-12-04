const { firestore } = require('../../../firebaseApp');
const {
  insertElementsToCollection,
  deleteCollection,
  getCollectionSize,
  getQuerySnapshotItems,
} = require('./utils');

const collection = firestore.collection('customers');

function getAllCustomers() {
  return collection
    .orderBy('order')
    .get()
    .then(getQuerySnapshotItems);
}

function getCustomersRange(startFrom, count) {
  return collection
    .orderBy('order')
    .startAt(startFrom)
    .limit(count)
    .get()
    .then(getQuerySnapshotItems);
}

function getCustomersLength() {
  return getCollectionSize(collection);
}

function getCustomerById(id) {
  return collection
    .doc(id)
    .get()
    .then(doc => doc.data());
}

function insertCustomers(customers = []) {
  return insertElementsToCollection(collection, customers);
}

function deleteAllCustomers() {
  return deleteCollection(collection, 10);
}

exports.getAllCustomers = getAllCustomers;
exports.getCustomersRange = getCustomersRange;
exports.getCustomersLength = getCustomersLength;
exports.getCustomerById = getCustomerById;
exports.insertCustomers = insertCustomers;
exports.deleteAllCustomers = deleteAllCustomers;
