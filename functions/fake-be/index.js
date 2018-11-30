const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use('/api/v1', router);

module.exports = app;
