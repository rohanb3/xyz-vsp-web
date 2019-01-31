const { getAllOperators, getOperatorsLength } = require('../repositories/db/superadminOperators');

function operators(req, res) {
  return getAllOperators()
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

function operatorsLength(req, res) {
  return getOperatorsLength()
    .then(length => res.send({ length }))
    .catch(error => res.status(500).send({ error }));
}

exports.operators = operators;
exports.operatorsLength = operatorsLength;
