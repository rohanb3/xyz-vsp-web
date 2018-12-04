const {
  getAllCustomers,
  getCustomersRange,
  getCustomerById,
  getCustomersLength,
} = require('../repositories/db/customers');

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
  let { startFrom, count } = req.query;

  startFrom = Number(startFrom);
  count = Number(count);

  const customersPromise =
    startFrom || count ? getCustomersRange(startFrom, count) : getAllCustomers();

  return customersPromise
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

function customersLength(req, res) {
  return getCustomersLength()
    .then(length => res.send({ length }))
    .catch(error => res.status(500).send({ error }));
}

exports.pickCustomerById = pickCustomerById;
exports.customerById = customerById;
exports.customers = customers;
exports.customersLength = customersLength;
