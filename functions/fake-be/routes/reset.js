const { insertCustomers, deleteAllCustomers } = require('../repositories/db/customers');
const customers = require('../fixtures/customers').items;

module.exports = function reset(req, res) {
  return deleteAllCustomers()
    .then(() => insertCustomers(customers))
    .then(() => {
      return res.send({ data: 'Success' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
};
