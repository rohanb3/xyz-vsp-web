const app = require('express')();
const fs = require('fs');
const path = require('path');

const router = require('./router');
const reset = require('./routes/reset');

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
/* eslint-disable-next-line global-require, import/no-dynamic-require */
middlewares.forEach(m => require(`./middlewares/${m}`)(app));

app.use('/api/v1', router);
app.get('/api/v1/reset', reset);

module.exports = app;
