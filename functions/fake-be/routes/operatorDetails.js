const operatorDetails = require('../fixtures/operatorDetails.json');

function getOperatorDetails(req, res) {
  const { operator } = req;
  res.send({ ...operatorDetails });
}

exports.getOperatorDetails = getOperatorDetails;
