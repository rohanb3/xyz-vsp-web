<template>
  <v-container fluid fill-height>
    <verification-code-form
      @sendVerificationCode="onSendVerificationCode"
      @resendCode="onResendCode"
    />
  </v-container>
</template>

 <script>
import VerificationCodeForm from '@/components/VerificationCodeForm';
import { GET_RESET_TOKEN } from '@/store/loggedInUser/actionTypes';
import { requestVerificationCode } from '@/services/identityRepository';

export default {
  name: 'VerificationCodePage',
  components: {
    VerificationCodeForm,
  },
  methods: {
    async onSendVerificationCode(code) {
      try {
        const userEmail = this.$store.state.loggedInUser.email;
        await this.$store.dispatch(GET_RESET_TOKEN, {
          email: userEmail,
          code,
        });
        this.$router.push({ name: 'reset-password' });
      } catch {
        this.$notify({
          group: 'notifications',
          title: this.$t('invalid.code.entered'),
          type: 'error',
        });
      }
    },
    async onResendCode() {
      try {
        const userEmail = this.$store.state.loggedInUser.email;
        await requestVerificationCode(userEmail);
        this.$notify({
          group: 'notifications',
          title: this.$t('we.sended.verification.code.again'),
          type: 'success',
        });
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
