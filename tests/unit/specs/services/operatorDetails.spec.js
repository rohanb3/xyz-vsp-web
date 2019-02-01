import api from '@/services/api';
import { getOperatorDetails } from '@/services/operatorDetails';

let data;

describe.only('should call api.get and return corect data', () => {
  beforeEach(() => {
    data = {
      id: '99838',
      full_name: 'Luisa Chaus',
      online: 'true',
      photo:
        'https://res.cloudinary.com/lp-builder/image/upload/v1545224610/users-images/pe8bjbw8rm4mtgzd6tfs.jpg',
      languages: ['English', 'Spanish', 'French'],
      audio_video_quality: '4.21',
      work_since: '2017-05-03T16:34:10',
      about:
        'Loved the service. I picked up a tariff plan. The only pity is that there is no possibility to customize the data.',
      email: 'luisachaus@gmail.com',
      phone: '+18923283883',
      address: '32 Uta 24th Street, Floor 8, Los Angeles, LA 40039, United States',
    };
  });

  describe('getOperatorDetails', () => {
    it('should call api.get and return correct data', async () => {
      api.get = jest.fn(() => Promise.resolve({ data }));
      const response = await getOperatorDetails();
      expect(response).toEqual(data);
    });
  });
});
