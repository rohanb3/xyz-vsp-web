const operatorDetails = require('../fixtures/operatorDetails.json');

function getOperatorDetails(req, res) {
  res.send(operatorDetails);
}

exports.getOperatorDetails = getOperatorDetails;
