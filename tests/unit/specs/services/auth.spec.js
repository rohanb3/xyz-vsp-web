import api from '@/services/api';
import { login } from '@/services/auth';

xdescribe('auth', () => {
  xdescribe('login', () => {
    it('should call api.post and return correct data', async () => {
      const [userName, password] = ['userName', 'password'];
      const data = { role: 'admin' };
      const authData = {
        data,
      };

      api.post = jest.fn(() => Promise.resolve(authData));

      const response = await login(userName, password);

      expect(response).toEqual(authData.data);
      expect(api.post).toHaveBeenCalledWith('/login', { userName, password });
    });
  });
});
