<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm4 elevation-6 class="login-form-wrapper" pa-0>
      <div class="login__header pa-3">
        <span class="heading">{{ $t('password.recovery') }}</span>
      </div>
      <div>
        <div>
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="Email"
              name="email"
              ref="emailInput"
              v-model="email"
              autofocus
              required
              class="pa-3"
              :rules="emailRules"
              @keydown.space.prevent
            ></v-text-field>
            <v-container fluid>
              <v-layout row mt-5 align-center justify-space-around>
                <v-flex order-lg2>
                  <router-link
                    class="back-to-login"
                    :to="{ name: 'login' }"
                  >{{ $t('back.to.login') }}</router-link>
                </v-flex>
                <v-flex order-lg2>
                  <v-btn class="button" :disabled="!valid" @click="sendVerificationCode">
                    {{
                    $t('send.me.code')
                    }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

 <script>
import { emailValidatorRegExp } from '@/constants';

const MAX_EMAIL_LENGTH = 50;
export default {
  name: 'PasswordRecoveryForm',
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || this.$t('email.is.required'),
        v => v.length <= MAX_EMAIL_LENGTH || this.$t('email.should.not.be.longer.than.50.symbols'),
        v => emailValidatorRegExp.test(v) || this.$t('email.should.be.valid'),
      ],
    };
  },
  methods: {
    sendVerificationCode() {
      if (this.valid) {
        this.$emit('verificationCode', this.email);
      }
    },
  },
};
</script>

 <style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.login-form-wrapper {
  padding: 21px 20px 27px;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 3px 4px 0 $lhs-shadow-color !important;
  background-color: $base-white;
  box-sizing: border-box;
  .login__header {
    .heading {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 500;
      color: $login-header-color;
    }
  }
  .back-to-login {
    text-decoration: none;
    font-size: 16px;
  }
  .button {
    width: 100%;
    border-radius: 4px;
    background-color: $base-blue !important;
    font-size: 16px;
    color: $base-white;
    text-align: center;
    margin: 0;
    box-shadow: none;
    text-transform: initial;
    font-weight: 550;
  }
}
</style>
