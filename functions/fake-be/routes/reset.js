const { insertCustomers, deleteAllCustomers } = require('../repositories/db/customers');
const { insertCalls, deleteAllCalls } = require('../repositories/db/calls');
const { insertOperators, deleteAllOperators } = require('../repositories/db/operators');
const customers = require('../fixtures/customers').items;
const calls = require('../fixtures/calls').items;
const operators = require('../fixtures/operators').items;

module.exports = function reset(req, res) {
  const deletionPromises = [deleteAllCustomers(), deleteAllCalls(), deleteAllOperators()];
  return Promise.all(deletionPromises)
    .then(() => {
      const creationPromises = [
        insertCustomers(customers),
        insertCalls(calls),
        insertOperators(operators),
      ];
      return Promise.all(creationPromises);
    })
    .then(() => {
      return res.send({ data: 'Success' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
};
