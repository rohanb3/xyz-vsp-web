const app = require('./index.js');

const port = process.env.port || 3000;

app.listen(port, () => console.log(`Fake BE started at ${port}`));
