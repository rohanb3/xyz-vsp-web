<template>
  <v-container fluid fill-height class="login-page">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6 class="login-form-wrapper">
        <div class="login__header">
          <span class="heading">{{ $t('login') }}</span>
        </div>
        <div>
          <div>
            <v-form v-model="valid" ref="form">
              <v-text-field
                label="Email"
                v-model="email"
                autofocus
                required
                :rules="emailRules"
                :validate-on-blur="true"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                class="password-input"
                v-model="password"
                required
              ></v-text-field>
              <div class="agreement">
                <v-checkbox
                  class="checkbox-input"
                  v-model="agreement"
                  :hide-details="true"
                ></v-checkbox>
                <div>
                  <span>{{ $t('i.agree.to.the') }} </span>
                  <a class="link">{{ $t('terms.and.conditions') }}</a>
                </div>
              </div>
              <v-btn @click="submit" class="button" :disabled="!valid || !agreement">{{
                $t('login')
              }}</v-btn>
            </v-form>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { LOGIN, GET_PROFILE_DATA } from '@/store/loggedInUser/actionTypes';
import { emailValidatorRegExp } from '@/constants';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      agreement: false,
      password: '',
      email: '',
      emailRules: [
        v => !!v || this.$t('email.is.required'),
        v => v.length <= 50 || this.$t('email.should.not.be.longer.than.50.symbols'),
        v => emailValidatorRegExp.test(v) || this.$t('email.should.be.valid'),
      ],
    };
  },
  methods: {
    async submit() {
      const { email, password } = this;
      if (this.$refs.form.validate() && this.agreement) {
        try {
          await this.$store.dispatch(LOGIN, { email, password });
          await this.$store.dispatch(GET_PROFILE_DATA);
          this.$router.push({ path: '/dashboard' });
        } catch (e) {
          this.$notify({
            group: 'notifications',
            title: 'Login failed',
            type: 'error',
            text: e,
          });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-page {
  .login-form-wrapper {
    padding: 21px 20px 27px;
    width: 320px;
    border-radius: 8px;
    box-shadow: 0 3px 4px 0 rgba(184, 184, 184, 0.5) !important;
    background-color: #ffffff;
    box-sizing: border-box;
    .login__header {
      .heading {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
      }
    }
    .password-input {
      margin-bottom: 30px;
    }
    .agreement {
      margin-bottom: 23px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .v-input--selection-controls {
        margin-top: 0px;
        padding-top: 0;
        flex: 0 0 auto;
      }
    }
    .link {
      text-decoration: underline;
    }
    .button {
      padding: 8px 0;
      width: 100%;
      border-radius: 4px;
      background-color: #398ffb;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      margin: 0;
      box-shadow: none;
    }
  }
}
</style>
