<template>
  <table-full-height-balloon @close="close">
    <div class="operator-details-card">
      <div class="operator-details-card-header">
        <div class="operator-photo">
          <img class="photo" :src="photo" alt="user-photo"/>
        </div>
        <div class="operator-info">
          <span class="operator-name">{{full_name}}</span>
          <div class="additional-info">
            <span class="status" :class="status">{{status}}</span>
            <span class="operator-id">ID {{id}}</span>
            <a class="link">{{ $t('show.review') }}</a>
          </div>
        </div>
        <v-icon
          class="close-icon"
          @click="close"
        >
          clear
        </v-icon>
      </div>
    <div class="operator-details-card-main">
      <div class="labelled-description system-quality">
        <div class="label">{{ $t('quality.of.audio.and.video') }}</div>
        <div class="description">
          <span class="rating">{{audio_video_quality}}</span>
          <v-rating
            color="#ff941b"
            size="12"
            background-color="grey lighten-1"
            readonly
            :value="parseFloat(audio_video_quality)"/>
        </div>
      </div>

      <div class="labelled-description">
        <div class="label">{{ $t('languages') }}</div>
        <div class="description bold">{{ languages.join(', ') }}</div>
      </div>

      <div class="labelled-description">
        <div class="label">{{ $t('work.since') }}</div>
        <div class="description bold">{{ workSince }}</div>
      </div>
      <div class="labelled-description">
        <div class="label">{{ $t('about') }}</div>
        <div class="description">{{ about }}</div>
      </div>

      <div class="labelled-description">
        <div class="label">{{ $t('email') }}</div>
        <div class="description email">{{ email }}</div>
      </div>

      <div class="labelled-description">
        <div class="label">{{ $t('phone') }}</div>
        <div class="description bold">{{ formattedPhone }}</div>
      </div>

      <div class="labelled-description">
        <div class="label">{{ $t('address') }}</div>
        <div class="description">{{ address }}</div>
      </div>
    </div>
    </div>
  </table-full-height-balloon>
</template>

<script>
import moment from 'moment';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { getOperatorDetails } from '@/services/operatorDetails';

import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';

export default {
  name: 'OperatorDetailsCard',
  components: {
    TableFullHeightBalloon,
  },
  props: {
    operatorId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id: null,
      full_name: null,
      online: null,
      photo: null,
      languages: [],
      audio_video_quality: null,
      work_since: null,
      about: null,
      email: null,
      phone: '',
      address: null,
    };
  },
  computed: {
    status() {
      return this.online ? 'online' : 'offline';
    },
    workSince() {
      return moment(this.work_since).format('MMMM D, YYYY');
    },
    formattedPhone() {
      if (!this.phone) return this.phone;

      const phoneNumber = parsePhoneNumberFromString(this.phone);

      return phoneNumber.formatInternational();
    },
  },
  mounted() {
    getOperatorDetails(this.operatorId).then(data => {
      Object.assign(this.$data, data);
    });

    const el = document.querySelector('.operator-details-card-main');
    this.scrollbar = new PerfectScrollbar(el);
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

#app .operator-details-card {
  width: 321px;
  height: 100%;
  display: flex;
  flex-flow: column;
  padding: 24px 0 10px 0;
  background-color: $base-white;

  .operator-details-card-header {
    padding: 0 10px 18px 27px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #dfdfdf;

    .operator-photo {
      align-self: flex-end;
      .photo {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
        vertical-align: bottom;
      }
    }

    .operator-info {
      display: flex;
      flex-direction: column;
      .operator-name {
        font-size: 20px;
        color: $base-text-color;
        margin-bottom: 5px;
        font-weight: bold;
      }

      .additional-info {
        display: flex;
        flex-direction: row;
        align-items: center;

        .status {
          margin-right: 10px;
          font-size: 12px;
          color: $base-green-text;
          display: flex;
          align-items: center;
          &::before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            margin-right: 5px;
            box-shadow: 0 0 5px 0 rgba(226, 255, 134, 0.44);
            background-image: linear-gradient(to bottom, #b2ff06, #79d614);
          }
          &.offline {
            color: $base-red;
            &::before {
              box-shadow: 0 0 5px 0 rgba(208, 2, 27, 0.44);
              background-image: linear-gradient(to bottom, red, #d0021b);
            }
          }
        }
        .operator-id {
          font-size: 12px;
          color: $base-grey;
          margin-right: 14px;
          white-space: nowrap;
        }
        .link {
          font-size: 12px;
          font-weight: 500;
          color: $base-blue;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
      }
    }
    .close-icon {
      cursor: pointer;
      color: $calls-feedback-card-primary-color;
      opacity: 0.2;
      font-weight: bold;
      align-self: flex-start;
    }
  }
  .operator-details-card-main {
    padding: 0 10px 0 27px;
    display: flex;
    flex-direction: column;
  }
  .labelled-description {
    margin-bottom: 5px;

    .v-rating {
      .v-icon {
        padding: 2px;
      }
    }
    .rating {
      color: $base-orange;
      font-size: 16px;
      font-weight: bold;
    }

    .label,
    .description {
      margin-bottom: 8px;
    }

    .label {
      font-size: 12px;
      color: $calls-feedback-card-secondary-color;
    }

    .description {
      font-size: 14px;
      color: $base-text-color;
      display: flex;
      align-items: center;

      &.email {
        color: $base-blue;
      }

      &.bold {
        color: $base-black;
      }
    }
  }
}
</style>
