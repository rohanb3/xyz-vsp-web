const {
  getAllPayments,
  getPaymentsRange,
  getPaymentsLength,
} = require('../repositories/db/payments');

function payments(req, res) {
  let { startFrom, count } = req.query;

  startFrom = Number(startFrom);
  count = Number(count);

  const paymentsPromise =
    startFrom || count ? getPaymentsRange(startFrom, count) : getAllPayments();

  return paymentsPromise
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

function paymentsLength(req, res) {
  return getPaymentsLength()
    .then(length => res.send({ length }))
    .catch(error => res.status(500).send({ error }));
}

exports.payments = payments;
exports.paymentsLength = paymentsLength;
