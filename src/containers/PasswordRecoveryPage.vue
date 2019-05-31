<template>
  <v-container fluid fill-height>
    <password-recovery-form @verificationCode="sendVerificationCode"/>
  </v-container>
</template>

 <script>
import PasswordRecoveryForm from '@/components/PasswordRecoveryForm';
import { requestVerificationCode } from '@/services/identityRepository';
import { SET_EMAIL } from '@/store/loggedInUser/mutationTypes';

export default {
  name: 'PasswordRecoveryPage',
  components: {
    PasswordRecoveryForm,
  },
  methods: {
    async sendVerificationCode(email) {
      try {
        const emailLowerCase = email.toLowerCase();
        await requestVerificationCode(emailLowerCase);

        this.$store.commit(SET_EMAIL, emailLowerCase);
        this.$router.push({ name: 'verification-code' });
      } catch (e) {
        const {
          response: {
            data: { errors: message },
          },
        } = e;

        if (message.Email) {
          this.$notify({
            group: 'notifications',
            title: this.$t('email.is.not.registered'),
            type: 'error',
          });
        } else {
          this.$notify({
            group: 'notifications',
            title: this.$t('something.went.wrong'),
            type: 'error',
          });
        }
      }
    },
  },
};
</script>
