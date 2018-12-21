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
const { getCallInfo, callBack } = require('./routes/call');
const { getCallsTypes, saveFeedback } = require('./routes/operatorFeedback');

router.param('customerId', pickCustomerById);
router.post('/login', login);
router.get('/customers/:customerId', customerById);
router.get('/customers', customers);
router.get('/customers-length', customersLength);
router.get('/calls', calls);
router.get('/calls-length', callsLength);
router.get('/profile', getProfileData);
router.post('/profile', changeProfileData);
router.get('/call/info', getCallInfo);
router.get('/call', callBack);
router.get('/operator-feedback/calls-type', getCallsTypes);
router.post('/operator-feedback', saveFeedback);
module.exports = router;
