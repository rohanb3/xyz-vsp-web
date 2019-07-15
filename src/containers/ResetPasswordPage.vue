<template>
  <v-container fluid fill-height>
    <reset-password-form @resetPassword="onResetPassword"/>
  </v-container>
</template>

 <script>
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { resetPassword } from '@/services/identityRepository';

export default {
  name: 'ResetPasswordPage',
  components: {
    ResetPasswordForm,
  },
  methods: {
    async onResetPassword(password) {
      try {
        const token = this.$store.state.loggedInUser.resetToken;
        await resetPassword(token, password);
        this.$router.push({ name: 'login' });
      } catch {
        this.$notify({
          group: 'notifications',
          title: this.$t('something.went.wrong'),
          type: 'error',
        });
      }
    },
  },
};
</script>
