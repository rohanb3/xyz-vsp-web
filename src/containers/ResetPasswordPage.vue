<template>
  <v-container fluid fill-height>
    <reset-password-form @resetPassword="onResetPassword"/>
  </v-container>
</template>

 <script>
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { resetPassword } from '@/services/identityRepository';
import { STATUS_OK } from '@/constants/responseStatuses';

export default {
  name: 'ResetPasswordPage',
  components: {
    ResetPasswordForm,
  },
  methods: {
    async onResetPassword(password) {
      try {
        const token = this.$store.state.loggedInUser.resetToken;
        const { status } = await resetPassword(token, password);
        if (status === STATUS_OK) {
          this.$router.push({ name: 'login' });
        } else throw new Error();
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
