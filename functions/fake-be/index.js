const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');
const reset = require('./routes/reset');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use('/api/v1', router);
app.get('/api/reset', reset);

module.exports = app;
