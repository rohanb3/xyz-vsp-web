const { firestore } = require('../../../firebaseApp');
const { insertElementsToCollection, deleteCollection, getQuerySnapshotItems } = require('./utils');

const collection = firestore.collection('customers');

function getAllCustomers() {
  return collection.get().then(getQuerySnapshotItems);
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
  return deleteCollection(collection);
}

exports.getAllCustomers = getAllCustomers;
exports.getCustomerById = getCustomerById;
exports.insertCustomers = insertCustomers;
exports.deleteAllCustomers = deleteAllCustomers;
