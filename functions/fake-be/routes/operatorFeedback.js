function getCallsTypes(req, res) {
  const types = ['info', 'help', 'sale'];
  const dispositions = ['long.name'];

  res.send({ types, dispositions });
}

function saveFeedback(req, res) {
  res.send({ status: 'success' });
}

exports.getCallsTypes = getCallsTypes;
exports.saveFeedback = saveFeedback;
