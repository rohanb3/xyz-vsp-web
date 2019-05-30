<template>
  <v-container fluid fill-height>
    <reset-password-form @resetPassword="onResetPassword"/>
  </v-container>
</template>

 <script>
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { resetPassword } from '@/services/identityRepository';
import { RESPONSE_STATUSES } from '@/constants';

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
        if (status === RESPONSE_STATUSES.OK) {
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
