import { login } from '@/services/repository';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      snackbar: false,
      e1: false,
      password: '',
      passwordRules: [v => !!v || this.$t('Password is required')],
      userName: '',
      userNameRules: [v => !!v || this.$t('Username is required')],
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const { userName, password } = this;
        const response = await login(userName, password);

        if (response === 'OK') {
          this.$router.push({ name: 'dashboard', params: { userName } });
        } else {
          this.snackbar = true;
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
