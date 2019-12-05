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
                name="email"
                ref="emailInput"
                v-model="email"
                autofocus
                required
                :rules="emailRules"
                :validate-on-blur="true"
                @keydown.space.prevent
              ></v-text-field>
              <v-text-field
                label="Password"
                class="password-input"
                name="password"
                ref="passwordInput"
                browser-autocomplete="new-password"
                v-model="password"
                required
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :type="e1 ? 'password' : 'text'"
                @click:append="() => (e1 = !e1)"
              ></v-text-field>

              <div class="forgot-link-wrapper">
                <router-link class="forgot-link" :to="{ name: 'password-recovery' }">
                  {{
                  $t('login.forgot')
                  }}
                </router-link>
              </div>

              <div class="agreement">
                <v-checkbox class="checkbox-input" v-model="agreement" :hide-details="true"></v-checkbox>
                <div>
                  <span>{{ $t('i.agree.to.the') }} </span>
                  <a class="link" target="_blank" :href="linkPrivacyPolicy">
                    {{ $t('terms.and.conditions') }}
                  </a>
                </div>
              </div>
              <v-btn
                @click="submit"
                class="button"
                :disabled="isLoginButtonDisabled"
              >
                <v-progress-circular v-if="loading" indeterminate color="primary" size="20"/>
                <span v-else>{{ $t('login') }}</span>
              </v-btn>
            </v-form>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { LOGIN, GET_PROFILE_DATA } from '@/store/loggedInUser/actionTypes';
import { emailValidatorRegExp, RESPONSE_STATUSES } from '@/constants';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      agreement: false,
      loading: false,
      password: '',
      email: '',
      e1: true,
      emailRules: [
        v => !!v || this.$t('email.is.required'),
        v => v.length <= 50 || this.$t('email.should.not.be.longer.than.50.symbols'),
        v => emailValidatorRegExp.test(v) || this.$t('email.should.be.valid'),
      ],
    };
  },
  computed: {
    linkPrivacyPolicy() {
      return 'https://xyzreviews.com/privacy-policy/';
    },
    isLoginButtonDisabled() {
      return !this.valid || !this.agreement || this.loading;
    },
  },
  methods: {
    async submit() {
      const { email, password } = this;
      if (this.$refs.form.validate() && this.agreement && !this.loading) {
        this.loading = true;
        try {
          await this.$store.dispatch(LOGIN, { email, password });
          await this.$store.dispatch(GET_PROFILE_DATA);
          this.$router.push({ path: '/dashboard' });
        } catch (e) {
          const {
            response: { status, data },
          } = e;

          const translations = {
            'Tenant is not specified for your Company. Please, contact support':
              'tenant.not.specified',
          };

          const title = translations[data] || data;

          switch (status) {
            case RESPONSE_STATUSES.FORBIDDEN:
              this.$notify({
                group: 'notifications',
                title: this.$t(title),
                type: 'error',
              });
              break;
            default:
              this.$notify({
                group: 'notifications',
                title: 'Login failed',
                type: 'error',
              });
              break;
          }
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.login-page {
  .login-form-wrapper {
    padding: 21px 20px 27px;
    width: 320px;
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
    .button {
      padding: 8px 0;
      width: 100%;
      border-radius: 4px;
      background-color: $base-blue;
      font-size: 16px;
      font-weight: bold;
      color: $base-white;
      text-align: center;
      margin: 0;
      box-shadow: none;
    }
  }
}
</style>
