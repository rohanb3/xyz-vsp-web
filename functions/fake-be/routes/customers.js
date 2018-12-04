const { getAllCustomers, getCustomerById } = require('../repositories/db/customers');

function pickCustomerById(req, res, next, id) {
  getCustomerById(id)
    .then(customer => {
      req.customer = customer;
      next();
      return;
    })
    .catch(error => {
      next();
    });
}

function customerById(req, res) {
  const { customer } = req;

  if (customer) {
    res.send(customer);
  } else {
    res.status(404).send({ error: 'Customer not found' });
  }
}

function customers(req, res) {
  return getAllCustomers()
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

exports.pickCustomerById = pickCustomerById;
exports.customerById = customerById;
exports.customers = customers;
