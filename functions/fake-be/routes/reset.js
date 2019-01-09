const { insertCustomers, deleteAllCustomers } = require('../repositories/db/customers');
const { insertOperators, deleteAllOperators } = require('../repositories/db/operators');
const { insertCalls, deleteAllCalls } = require('../repositories/db/calls');
const {
  insertOperatorReviews,
  deleteAllOperatorReviews,
} = require('../repositories/db/operatorReview');

const customers = require('../fixtures/customers').items;
const calls = require('../fixtures/calls').items;
const operators = require('../fixtures/operators').items;
const operatorReview = require('../fixtures/operatorReview').items;

module.exports = function reset(req, res) {
  const deletionPromises = [
    deleteAllCustomers(),
    deleteAllCalls(),
    deleteAllOperators(),
    deleteAllOperatorReviews(),
  ];

  return Promise.all(deletionPromises)
    .then(() => {
      const creationPromises = [
        insertCustomers(customers),
        insertCalls(calls),
        insertOperators(operators),
        insertOperatorReviews(operatorReview),
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
