const {
  getAllSuperadminCompanies,
  getSuperadminCompaniesRange,
  getSuperadminCompaniesLength,
} = require('../repositories/db/superadminCompanies');

function superadminCompanies(req, res) {
  let { startFrom, count } = req.query;

  startFrom = Number(startFrom);
  count = Number(count);

  const companiesPromise =
    startFrom || count
      ? getSuperadminCompaniesRange(startFrom, count)
      : getAllSuperadminCompanies();

  return companiesPromise
    .then(items => {
      return res.send({ items });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
}

function superadminCompaniesLength(req, res) {
  return getSuperadminCompaniesLength()
    .then(length => res.send({ length }))
    .catch(error => res.status(500).send({ error }));
}

exports.superadminCompanies = superadminCompanies;
exports.superadminCompaniesLength = superadminCompaniesLength;
