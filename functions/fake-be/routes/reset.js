const { insertCustomers, deleteAllCustomers } = require('../repositories/db/customers');
const {
  insertSuperadminCompanies,
  deleteAllSuperadminCompanies,
} = require('../repositories/db/superadminCompanies');
const { insertOperators, deleteAllOperators } = require('../repositories/db/operators');
const { insertCalls, deleteAllCalls } = require('../repositories/db/calls');
const {
  insertOperatorReviews,
  deleteAllOperatorReviews,
} = require('../repositories/db/operatorReview');
const { insertCallsDuration, deleteAllCallsDuration } = require('../repositories/db/callsDuration');
const { insertCallsFeedback, deleteAllCallsFeedback } = require('../repositories/db/callsFeedback');

const customers = require('../fixtures/customers').items;
const superadminCompanies = require('../fixtures/superadminCompanies').items;
const calls = require('../fixtures/calls').items;
const operators = require('../fixtures/operators').items;
const operatorReview = require('../fixtures/operatorReview').items;
const callsDuration = require('../fixtures/callsDuration').items;
const callsFeedback = require('../fixtures/callsFeedback').items;

module.exports = function reset(req, res) {
  const deletionPromises = [
    deleteAllCustomers(),
    deleteAllSuperadminCompanies(),
    deleteAllCalls(),
    deleteAllOperators(),
    deleteAllOperatorReviews(),
    deleteAllCallsDuration(),
    deleteAllCallsFeedback(),
  ];

  return Promise.all(deletionPromises)
    .then(() => {
      const creationPromises = [
        insertCustomers(customers),
        insertSuperadminCompanies(superadminCompanies),
        insertCalls(calls),
        insertOperators(operators),
        insertOperatorReviews(operatorReview),
        insertCallsDuration(callsDuration),
        insertCallsFeedback(callsFeedback),
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
