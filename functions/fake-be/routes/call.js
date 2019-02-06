function getCallInfo(req, res) {
  const data = { duration: 272000 };
  res.send(data);
}

function callBack(req, res) {
  res.send({ status: 'success' });
}

exports.getCallInfo = getCallInfo;
exports.callBack = callBack;
