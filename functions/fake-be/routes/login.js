module.exports = function login(req, res){
  const { userName, password } = req.body;

  if (userName === 'Admin' && password) {
    res.send('OK');
  } else {
    res.status(403).send({ error: 'Not Authorized' });
  }
}
