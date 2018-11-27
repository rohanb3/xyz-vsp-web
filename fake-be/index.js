const app = require('express')();
const bodyParser = require('body-parser');

const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  console.log(req.body, req);

  const { userName, password } = req.body || { userName: 'Anonymous' };

  if (userName === 'Admin' && password) {
    res.send('OK');
  } else {
    res.status(403).send();
  }
});

app.get('/company', (req, res) => {
  const companies = [{ id: 1, name: 'Test' }];
  res.send(JSON.stringify(companies));
});


app.listen(port, () => console.log(`Fake BE started at ${port}`));
