const { getAllCustomers } = require('../repositories/db/customers');

module.exports = function customers(req, res) {
  return getAllCustomers()
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
};
