const { firestore } = require('../../../firebaseApp');
const { insertElementsToCollection, deleteCollection, getQuerySnapshotItems } = require('./utils');

const collection = firestore.collection('customers');

function getAllCustomers() {
  return collection.get().then(getQuerySnapshotItems);
}

function insertCustomers(customers = []) {
  return insertElementsToCollection(collection, customers);
}

function deleteAllCustomers() {
  return deleteCollection(collection);
}

exports.getAllCustomers = getAllCustomers;
exports.insertCustomers = insertCustomers;
exports.deleteAllCustomers = deleteAllCustomers;
