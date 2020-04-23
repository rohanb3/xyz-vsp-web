import api from '@/services/api';
import { getProfileData, changeProfileData } from '@/services/profile';

let data;

describe('profile', () => {
  beforeEach(() => {
    data = {
      firstName: 'Robert',
      lastName: 'Smith',
      email: 'robert_smith@gmail.com',
      password: '123456',
      photo: 'https://i.stack.imgur.com/x8PhM.png',
      callingPhoto:
        'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg',
      plan: 'Team Trial Plan',
      planTerms: '21 Sep 2018 - 19 Dec 2019',
    };
  });

  describe('getProfileData', () => {
    it('should call api.get and return correct data', async () => {
      api.get = jest.fn(() => Promise.resolve({ data }));
      const response = await getProfileData();

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith('/profile');
    });
  });
  describe('changeProfileData', () => {
    it('should call api.post and return correct data', async () => {
      const successResponse = { status: 'success' };
      api.post = jest.fn(() => Promise.resolve({ data: successResponse }));
      const response = await changeProfileData(data);

      expect(response).toEqual(successResponse);
      expect(api.post).toHaveBeenCalledWith('/profile', data);
    });
  });
});
