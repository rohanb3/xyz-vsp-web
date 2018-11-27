import { login } from '@/services/repository';

export default {
  name: 'Login',
  mounted() {
    login('Admin', '123456');
  },
};
