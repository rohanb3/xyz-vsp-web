<template>
  <v-layout row justify-center v-cssBlurOverlay v-if="isDialogShown">
    <v-dialog content-class="incoming-call-popup" v-model="isDialogShown" persistent>
      <div class="content">
        <p>{{ $t('already.logged.in') }}</p>
        <div class="action-buttons">
          <v-btn @click="reconnect">{{ $t('reconnect') }}</v-btn>
        </div>
      </div>
    </v-dialog>
  </v-layout>
</template>

<script>
import qs from 'qs';
import { mapGetters } from 'vuex';
import cssBlurOverlay from '@/directives/cssBlurOverlay';

const TRIGGER_QUERY = 'disconnected';

export default {
  name: 'AlreadyLoggedInPopup',
  directives: {
    cssBlurOverlay,
  },
  computed: {
    ...mapGetters(['connectionDropped']),
    isDialogShown() {
      return !!(TRIGGER_QUERY in this.$route.query);
    },
  },
  watch: {
    connectionDropped() {
      const query = { ...this.$route.query, [TRIGGER_QUERY]: true };
      this.$router.replace({ query });
    },
  },
  methods: {
    reconnect() {
      const { [TRIGGER_QUERY]: param, ...query } = this.$route.query;
      const q = qs.stringify(query);
      const { path } = this.$route;
      const href = path + (q ? `?${q}` : '');

      window.location.href = href;
    },
  },
};
</script>

<style lang="scss">
.incoming-call-popup {
  border-radius: 10.5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
</style>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.content {
  width: 350px;
  height: 100px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  .action-buttons {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
  }
}
</style>
