function getProfileData(req, res) {
  const data = {
    firstName: 'Robert',
    lastName: 'Smith',
    email: 'robert_smith@gmail.com',
    password: '123456',
    photo: 'https://i.stack.imgur.com/x8PhM.png',
    callingPhoto: 'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg',
    plan: 'Team Trial Plan',
    planTerms: '21 Sep 2018 - 19 Dec 2019',
  };

  res.send(data);
}

function changeProfileData(req, res) {
  res.send({ status: 'success' });
}

exports.getProfileData = getProfileData;
exports.changeProfileData = changeProfileData;
