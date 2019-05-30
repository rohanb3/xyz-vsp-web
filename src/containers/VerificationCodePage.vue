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
import { RESPONSE_STATUSES } from '@/constants';
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
        const status = await this.$store.dispatch(GET_RESET_TOKEN, {
          email: userEmail,
          code,
        });
        if (status === RESPONSE_STATUSES.OK) {
          this.$router.push({ name: 'reset-password' });
        } else throw new Error();
      } catch {
        this.$notify({
          group: 'notifications',
          title: this.$t('invalid.code.entered'),
          type: 'error',
        });
      }
    },
    async onResendCode() {
      const userEmail = this.$store.state.loggedInUser.email;
      const status = await requestVerificationCode(userEmail);
      if (status === RESPONSE_STATUSES.OK) {
        this.$notify({
          group: 'notifications',
          title: this.$t('we.sended.verification.code.again'),
          type: 'success',
        });
      } else {
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
