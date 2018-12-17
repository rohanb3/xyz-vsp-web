const { insertCustomers, deleteAllCustomers } = require('../repositories/db/customers');
const { insertCalls, deleteAllCalls } = require('../repositories/db/calls');
const customers = require('../fixtures/customers').items;
const calls = require('../fixtures/calls').items;

module.exports = function reset(req, res) {
  const deletionPromises = [deleteAllCustomers(), deleteAllCalls()];
  return Promise.all(deletionPromises)
    .then(() => {
      const creationPromises = [insertCustomers(customers), insertCalls(calls)];
      return Promise.all(creationPromises);
    })
    .then(() => {
      return res.send({ data: 'Success' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
};
