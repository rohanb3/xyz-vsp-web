const { getAllOperators, getOperatorsLength } = require('../repositories/db/operators');
// TODO: delete this temporary solution
const items = [
  {
    id: '32841',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545224610/users-images/pe8bjbw8rm4mtgzd6tfs.jpg',
    name: 'Stuart Little',
    department: 'Support, Sale',
    score: '234',
    calls: '4208',
    info: '1438',
    help: '1431',
    sale: '1339',
    wrapUpTime: '40',
    rating: '4,93',
    positive: '3843',
    negative: '365',
    qtyOfReviews: '43/6',
    lastReview: '2018-12-23T00:00:00',
  },
  {
    id: '43981',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545988436/users-images/uraqbbxixpqyjkchi6kg.jpg',
    name: 'Leonard Grange',
    department: 'Sale',
    score: '200',
    calls: '1284',
    info: '389',
    help: '391',
    sale: '504',
    wrapUpTime: '40',
    rating: '4,93',
    positive: '3843',
    negative: '365',
    qtyOfReviews: '43/6',
    lastReview: '2018-11-23T00:00:00',
  },
  {
    id: '85484',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986892/users-images/edm2epdrnxt4b1mlkikc.jpg',
    name: 'Mikle Clause',
    department: 'Support',
    score: '195',
    calls: '4304',
    info: '1431',
    help: '1193',
    sale: '1680',
    wrapUpTime: '77',
    rating: '4.42',
    positive: '3910',
    negative: '394',
    qtyOfReviews: '39/4',
    lastReview: '2018-11-23T00:00:00',
  },
  {
    id: '43899',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545987456/users-images/obnhufu3uxy2h8ukva7y.jpg',
    name: 'Anna White',
    department: 'Sale',
    score: '180',
    calls: '4270',
    info: '1438',
    help: '1431',
    sale: '1291',
    wrapUpTime: '36',
    rating: '4.23',
    positive: '3817',
    negative: '453',
    qtyOfReviews: '28/4',
    lastReview: '2018-11-19T00:00:00',
  },
  {
    id: '43781',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '1',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '2',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '3',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '4',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '5',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '6',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '7',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '8',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
  {
    id: '9',
    photo:
      'https://res.cloudinary.com/lp-builder/image/upload/v1545986934/users-images/ac8ba5p6c0a4lgdw6xe3.jpg',
    name: 'Jonny House',
    department: 'Support, Sale',
    score: '167',
    calls: '2399',
    info: '1210',
    help: '1093',
    sale: '1196',
    wrapUpTime: '31',
    rating: '3.97',
    positive: '2247',
    negative: '152',
    qtyOfReviews: '32/9',
    lastReview: '2018-11-22T00:00:00',
  },
];

const length = items.length;

function operators(req, res) {
  return res.send({ items });
}

function operatorsLength(req, res) {
  return res.send({ length });
}
// TODO: uncomment when find out why firebase doesn't see operators
// function operators(req, res) {
//   return getAllOperators()
//     .then(items => {
//       return res.send({ items });
//     })
//     .catch(error => {
//       return res.status(500).send({ error });
//     });
// }

// function operatorsLength(req, res) {
//   return getOperatorsLength()
//     .then(length => res.send({ length }))
//     .catch(error => res.status(500).send({ error }));
// }

exports.operators = operators;
exports.operatorsLength = operatorsLength;
