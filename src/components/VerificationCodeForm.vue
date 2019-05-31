<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm4 elevation-6 class="login-form-wrapper" pa-0>
      <div class="login__header pa-3">
        <span class="heading">{{ $t('verification.code') }}</span>
        <div class="description">{{ $t('we.sended.verification.code') }}</div>
      </div>
      <div>
        <div>
          <v-form v-model="valid" ref="form">
            <div class="code-wrapper">
              <v-text-field
                class="entered-code"
                v-model="code1"
                autofocus
                required
                :rules="codeRules"
                :validate-on-blur="true"
                ref="inputCode1"
                maxlength="1"
                @focus="activeField = 1"
                @input="onInputCode"
              ></v-text-field>
              <v-text-field
                class="entered-code"
                v-model="code2"
                required
                :rules="codeRules"
                :validate-on-blur="true"
                ref="inputCode2"
                maxlength="1"
                @focus="activeField = 2"
                @input="onInputCode"
              ></v-text-field>
              <v-text-field
                class="entered-code"
                v-model="code3"
                required
                :rules="codeRules"
                :validate-on-blur="true"
                ref="inputCode3"
                maxlength="1"
                @focus="activeField = 3"
                @input="onInputCode"
              ></v-text-field>
              <v-text-field
                class="entered-code"
                v-model="code4"
                required
                :rules="codeRules"
                :validate-on-blur="true"
                ref="inputCode4"
                maxlength="1"
                @focus="activeField = 4"
                @input="onInputCode"
              ></v-text-field>
            </div>
            <div class="resend-code-wrapper">
              <a
                class="resend-link"
                href="#"
                @click.prevent="$emit('resendCode')"
              >{{ $t('resend.code') }}</a>
            </div>
            <v-container fluid>
              <v-layout row mt-4 align-center justify-space-around>
                <v-flex order-lg2>
                  <router-link
                    class="back-to-login"
                    :to="{ name: 'login' }"
                  >{{ $t('back.to.login') }}</router-link>
                </v-flex>
                <v-flex order-lg2>
                  <v-btn
                    class="button"
                    @click="$emit('sendVerificationCode', code)"
                    :disabled="!valid"
                  >{{ $t('login.submit') }}</v-btn>
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
export default {
  name: 'VerificationCodeForm',
  data() {
    return {
      email: '',
      code1: null,
      code2: null,
      code3: null,
      code4: null,
      valid: false,
      activeField: null,
      codeRules: [
        v => /^[0-9]$/.test(Number(v)) || this.$t('code.must.be'),
        v => (v && v.length === 1) || this.$t('code.must.be'),
      ],
    };
  },
  computed: {
    code() {
      return (
        String(this.code1 || '') +
        String(this.code2 || '') +
        String(this.code3 || '') +
        String(this.code4 || '')
      );
    },
  },
  methods: {
    onInputCode(code) {
      if (String(code).length === 1) {
        switch (this.activeField) {
          case 1:
            this.$refs.inputCode2.focus();
            break;
          case 2:
            this.$refs.inputCode3.focus();
            break;
          default:
            this.$refs.form.validate();
            this.$refs.inputCode4.focus();
        }
      }
      if (String(code).length === 0) {
        switch (this.activeField) {
          case 3:
            this.$refs.inputCode2.focus();
            break;
          case 4:
            this.$refs.inputCode3.focus();
            break;
          default:
            this.$refs.inputCode1.focus();
        }
      }
      return /^[0-9]$/.test(Number(code));
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
  .code-wrapper {
    display: flex;
    .entered-code /deep/ {
      width: 61px;
      margin: 0 10px;
      font-size: 28px;
      input {
        text-align: center;
      }
    }
  }
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
  .back-to-login {
    text-decoration: none;
    font-size: 16px;
  }

  .resend-code-wrapper {
    text-align: right;
    margin-bottom: 30px;
    margin-right: 10px;
    font-size: 12px;

    .resend-link {
      text-decoration: none;
    }
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
