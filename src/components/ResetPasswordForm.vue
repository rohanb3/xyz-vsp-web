<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm4 elevation-6 pb-0 class="login-form-wrapper">
      <div class="login__header">
        <span class="heading">{{ $t('reset.password') }}</span>
        <div class="description mb-3">{{ $t('enter.your.new.password') }}</div>
      </div>
      <div>
        <div>
          <v-form v-model="valid" ref="form">
            <v-text-field
              :label="$t('new.password')"
              class="password-input"
              name="password"
              v-model.trim="password"
              required
              autofocus
              :append-icon="showPasswordFlag ? 'visibility' : 'visibility_off'"
              :type="showPasswordFlag ? 'password' : 'text'"
              :rules="passwordRules"
              @input="checkPassword"
              @click:append="() => (showPasswordFlag = !showPasswordFlag)"
              @keydown.space.prevent
            ></v-text-field>
            <v-text-field
              :label="$t('confirm.new.password')"
              class="password-input"
              name="confirmPassword"
              v-model.trim="confirmPassword"
              required
              :append-icon="showPasswordFlag ? 'visibility' : 'visibility_off'"
              :type="showPasswordFlag ? 'password' : 'text'"
              :rules="passwordRules"
              @input="checkPassword"
              @click:append="() => (showPasswordFlag = !showPasswordFlag)"
              @keydown.space.prevent
            ></v-text-field>
            <v-container fluid px-0>
              <v-layout row mt-5 px-0 align-center justify-space-around>
                <v-flex order-lg2>
                  <router-link class="back-to-login" :to="{ name: 'login' }">
                    {{
                    $t('back.to.login')
                    }}
                  </router-link>
                </v-flex>
                <v-flex order-lg2>
                  <v-btn
                    @click="onSubmit"
                    class="button"
                    :disabled="!valid"
                  >{{ $t('reset.password') }}</v-btn>
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
const PASSWORD_LENGTH = 7;
export default {
  name: 'ResetPasswordForm',
  data() {
    return {
      valid: false,
      password: '',
      confirmPassword: '',
      showPasswordFlag: true,
      passwordRules: [
        v => !!v || this.$t('password.is.required'),
        v => v.length > PASSWORD_LENGTH || this.$t('password.must.be.at.least.8.chracters'),
        v => /[A-Z]/.test(v) || this.$t('password.must.contain.capital.letter'),
        () => this.password === this.confirmPassword || this.$t('password.do.not.match'),
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.valid) {
        this.$emit('resetPassword', this.password);
      }
    },
    comparePassword() {
      return this.password === this.confirmPassword;
    },
    checkPassword() {
      this.$refs.form.validate();
    },
  },
};
</script>

 <style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.login-form-wrapper {
  padding: 21px 20px 27px;
  max-width: 320px;
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
    .description {
      color: $base-text-color;
    }
  }
  .password-input {
    margin-bottom: 6px;
  }
  .forgot-link-wrapper {
    text-align: right;
    margin-bottom: 30px;
    font-size: 12px;
    .forgot-link {
      text-decoration: none;
    }
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
  .back-to-login {
    text-decoration: none;
    font-size: 16px;
  }
  .button {
    padding: 8px 0;
    width: 100%;
    border-radius: 4px;
    text-transform: initial;
    background-color: $base-blue !important;
    font-size: 16px;
    font-weight: 500;
    color: $base-white;
    text-align: center;
    margin: 0;
    box-shadow: none;
  }
}
</style>
