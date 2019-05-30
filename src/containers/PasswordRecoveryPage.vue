<template>
  <v-container fluid fill-height>
    <password-recovery-form @verificationCode="sendVerificationCode"/>
  </v-container>
</template>

 <script>
import PasswordRecoveryForm from '@/components/PasswordRecoveryForm';
import { requestVerificationCode } from '@/services/identityRepository';
import { RESPONSE_STATUSES } from '@/constants';
import { SET_EMAIL } from '@/store/loggedInUser/mutationTypes';

export default {
  name: 'PasswordRecoveryPage',
  components: {
    PasswordRecoveryForm,
  },
  methods: {
    async sendVerificationCode(email) {
      const emailLowerCase = email.toLowerCase();
      const status = await requestVerificationCode(emailLowerCase);
      if (status === RESPONSE_STATUSES.OK) {
        this.$store.commit(SET_EMAIL, emailLowerCase);
        this.$router.push({ name: 'verification-code' });
      }
    },
  },
};
</script>
