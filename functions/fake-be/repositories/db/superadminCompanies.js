const { firestore } = require('../../../firebaseApp');
const {
  getCollectionSize,
  getQuerySnapshotItems,
  insertElementsToCollection,
  deleteCollection,
} = require('./utils');

const collection = firestore.collection('superadminCompanies');

function getAllSuperadminCompanies() {
  return collection
    .orderBy('company')
    .get()
    .then(getQuerySnapshotItems);
}

function getSuperadminCompaniesRange(startFrom, count) {
  return getAllSuperadminCompanies().then(companies =>
    companies.slice(startFrom, startFrom + count)
  );
}

function getSuperadminCompaniesLength() {
  return getCollectionSize(collection);
}

function insertSuperadminCompanies(companies = []) {
  return insertElementsToCollection(collection, companies);
}

function deleteAllSuperadminCompanies() {
  return deleteCollection(collection, 10);
}

exports.getAllSuperadminCompanies = getAllSuperadminCompanies;
exports.getSuperadminCompaniesRange = getSuperadminCompaniesRange;
exports.getSuperadminCompaniesLength = getSuperadminCompaniesLength;
exports.insertSuperadminCompanies = insertSuperadminCompanies;
exports.deleteAllSuperadminCompanies = deleteAllSuperadminCompanies;
