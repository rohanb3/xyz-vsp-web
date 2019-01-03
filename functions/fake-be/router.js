const router = require('express').Router();

const login = require('./routes/login');
const {
  customers,
  pickCustomerById,
  customerById,
  customersLength,
} = require('./routes/customers');
const { calls, callsLength } = require('./routes/calls');
const { getProfileData, changeProfileData } = require('./routes/profile');
const { getOperatorReviewData } = require('./routes/operators');

router.param('customerId', pickCustomerById);
router.post('/login', login);
router.get('/customers/:customerId', customerById);
router.get('/customers', customers);
router.get('/customers-length', customersLength);
router.get('/calls', calls);
router.get('/calls-length', callsLength);
router.get('/profile', getProfileData);
router.post('/profile', changeProfileData);
router.get('/operator-review', getOperatorReviewData);

module.exports = router;
