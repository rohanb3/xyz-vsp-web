const { firestore } = require('../../../firebaseApp');

function deleteCollection(collection, batchSize = 10) {
  var query = collection.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, batchSize, resolve, reject);
  });
}

function insertElementsToCollection(collection, elements = []) {
  const add = collection.add.bind(collection);
  const promises = elements.map(add);
  return Promise.all(promises);
}

function deleteQueryBatch(query, batchSize, resolve, reject) {
  return query
    .get()
    .then(snapshot => {
      if (snapshot.size === 0) {
        return 0;
      }

      const batch = firestore.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      /* eslint-disable-next-line promise/no-nesting */
      return batch.commit().then(() => snapshot.size);
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      process.nextTick(() => {
        deleteQueryBatch(query, batchSize, resolve, reject);
      });
      return;
    })
    .catch(reject);
}

function getQuerySnapshotItems(querySnapshot, idField = 'id') {
  const items = [];

  querySnapshot.forEach(doc => {
    const item = Object.assign(doc.data(), { [idField]: doc.id });
    items.push(item);
  });

  return items;
}

exports.deleteCollection = deleteCollection;
exports.insertElementsToCollection = insertElementsToCollection;
exports.getQuerySnapshotItems = getQuerySnapshotItems;
