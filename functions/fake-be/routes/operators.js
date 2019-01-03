const { getAllReviews } = require('../repositories/db/operatorReview');
const reset = require('./reset');

function getOperatorReviewData(req, res) {
  return getAllReviews()
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

exports.getOperatorReviewData = getOperatorReviewData;
