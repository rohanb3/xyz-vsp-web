const router = require('express').Router();

const login = require('./routes/login');
const {
  customers,
  pickCustomerById,
  customerById,
  customersLength,
} = require('./routes/customers');
const { superadminCompanies, superadminCompaniesLength } = require('./routes/superadminCompanies');
const { calls, callsLength } = require('./routes/calls');
const { getProfileData, changeProfileData } = require('./routes/profile');
const { operators, operatorsLength, getOperatorReviewData } = require('./routes/operators');
const { getCallInfo, callBack } = require('./routes/call');
const { getCallsTypes, saveFeedback } = require('./routes/operatorFeedback');
const { callsDuration } = require('./routes/callsDuration');
const { callsFeedback } = require('./routes/callsFeedback');
const {
  operators: superadminOperators,
  operatorsLength: superAdminOperatorsLength,
} = require('./routes/superadminOperators');
const { getOperatorDetails } = require('./routes/operatorDetails');

router.param('customerId', pickCustomerById);
router.post('/login', login);
router.get('/customers/:customerId', customerById);
router.get('/customers', customers);
router.get('/customers-length', customersLength);
router.get('/superadmin-companies', superadminCompanies);
router.get('/superadmin-companies-length', superadminCompaniesLength);
router.get('/calls', calls);
router.get('/calls-length', callsLength);
router.get('/profile', getProfileData);
router.post('/profile', changeProfileData);
router.get('/operators', operators);
router.get('/operators-length', operatorsLength);
router.get('/call/info', getCallInfo);
router.get('/call', callBack);
router.get('/operator-feedback/calls-type', getCallsTypes);
router.post('/operator-feedback', saveFeedback);
router.get('/operator-review', getOperatorReviewData);
router.get('/calls-duration', callsDuration);
router.get('/calls-feedback', callsFeedback);
router.get('/superadmin/operators', superadminOperators);
router.get('/superadmin/operators-length', superAdminOperatorsLength);
router.get('/operator-details/:operatorId', getOperatorDetails);

module.exports = router;
