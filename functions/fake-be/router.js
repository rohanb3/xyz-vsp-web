const router = require('express').Router();

const login = require('./routes/login');
const { customers, pickCustomerById, customerById } = require('./routes/customers');

router.param('customerId', pickCustomerById);
router.post('/login', login);
router.get('/customers/:customerId', customerById);
router.get('/customers', customers);

module.exports = router;
