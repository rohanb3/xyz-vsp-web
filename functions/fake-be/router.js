const router = require('express').Router();

const login = require('./routes/login');
const customers = require('./routes/customers');

router.post('/login', login);
router.get('/customers', customers);

module.exports = router;
