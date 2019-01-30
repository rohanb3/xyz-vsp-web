const { getAllCallsFeedback } = require('../repositories/db/callsFeedback');

function callsFeedback(req, res) {
  return getAllCallsFeedback()
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

exports.callsFeedback = callsFeedback;
