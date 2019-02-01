module.exports = function login(req, res) {
  const { userName, password } = req.body;

  if (userName === 'Admin' && password) {
    res.send({ role: 'admin', name: userName });
  } else if (userName === 'Operator' && password) {
    res.send({ role: 'operator' });
  } else if (userName === 'Supervisor' && password) {
    res.send({ role: 'supervisor' });
  } else if (userName === 'Superadmin' && password) {
    res.send({ role: 'superadmin' });
  } else {
    res.status(403).send({ error: 'Not Authorized' });
  }
};
