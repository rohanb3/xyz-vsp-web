const { getAllCallsDuration } = require('../repositories/db/callsDuration');

function callsDuration(req, res) {
  return getAllCallsDuration()
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

exports.callsDuration = callsDuration;
