<template>
  <v-container fluid fill-height>
    <password-recovery-form @verificationCode="sendVerificationCode"/>
  </v-container>
</template>

 <script>
import PasswordRecoveryForm from '@/components/PasswordRecoveryForm';
import { requestVerificationCode } from '@/services/identityRepository';
import { STATUS_OK } from '@/constants/responseStatuses';
import { SET_EMAIL } from '@/store/loggedInUser/mutationTypes';

export default {
  name: 'PasswordRecoveryPage',
  components: {
    PasswordRecoveryForm,
  },
  methods: {
    async sendVerificationCode(email) {
      const status = await requestVerificationCode(email);
      if (status === STATUS_OK) {
        this.$store.commit(SET_EMAIL, email);
        this.$router.push({ name: 'verification-code' });
      }
    },
  },
};
</script>
