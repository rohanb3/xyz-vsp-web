const { getAllCalls, getCallsLength } = require('../repositories/db/calls');

function calls(req, res) {
  return getAllCalls()
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

function callsLength(req, res) {
  return getCallsLength()
    .then(length => res.send({ length }))
    .catch(error => res.status(500).send({ error }));
}

exports.calls = calls;
exports.callsLength = callsLength;
