const { firestore } = require('../../../firebaseApp');
const { insertElementsToCollection, deleteCollection, getQuerySnapshotItems } = require('./utils');

const collection = firestore.collection('operatorReview');

function getAllReviews() {
  return collection
    .orderBy('date', 'desc')
    .get()
    .then(getQuerySnapshotItems);
}

function insertOperatorReviews(calls = []) {
  return insertElementsToCollection(collection, calls);
}

function deleteAllOperatorReviews() {
  return deleteCollection(collection, 10);
}

exports.getAllReviews = getAllReviews;
exports.insertOperatorReviews = insertOperatorReviews;
exports.deleteAllOperatorReviews = deleteAllOperatorReviews;
