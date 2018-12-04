/* eslint-disable promise/no-nesting */

const { firestore } = require('../../../firebaseApp');

function deleteCollection(collection, batchSize) {
  var query = collection.limit(batchSize);
  return deleteQueryBatch(query, batchSize);
}

function insertElementsToCollection(collection, elements = []) {
  const add = collection.add.bind(collection);
  const promises = elements.map(add);
  return Promise.all(promises);
}

function getQuerySnapshotItems(querySnapshot, idField = 'id') {
  const items = [];

  querySnapshot.forEach(doc => {
    const item = Object.assign(doc.data(), { [idField]: doc.id });
    items.push(item);
  });

  return items;
}

function deleteQueryBatch(query, batchSize = 10) {
  return query
    .get()
    .then(snapshot => {
      if (snapshot.size === 0) {
        return true;
      }

      const batch = firestore.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      return batch.commit().then(() => false);
    })
    .then(empty => {
      if (!empty) {
        return new Promise((resolve, reject) => {
          process.nextTick(() => {
            deleteQueryBatch(query, batchSize)
              .then(resolve)
              .catch(reject);
          });
        });
      } else {
        return false;
      }
    });
}

exports.deleteCollection = deleteCollection;
exports.insertElementsToCollection = insertElementsToCollection;
exports.getQuerySnapshotItems = getQuerySnapshotItems;
