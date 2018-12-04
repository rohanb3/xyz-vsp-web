const { insertCustomers, deleteAllCustomers } = require('../repositories/db/customers');
const customers = require('../fixtures/customers').items;

module.exports = function reset(req, res) {
  const preparedCustomers = customers.map((customer, index) =>
    Object.assign({}, customer, { order: index })
  );
  return deleteAllCustomers()
    .then(() => insertCustomers(preparedCustomers))
    .then(() => {
      return res.send({ data: 'Success' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
};
