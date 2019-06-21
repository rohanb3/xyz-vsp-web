<template>
  <div
    class="comment-cell"
    :class="dynamicClass"
  >
    <p
      class="comment-title isClickable"
      ref="comment"
      @click="showComment"
    >
      {{ getValue }}
    </p>

    <v-dialog
      v-model="show"
      persistent
      width="600px"
      scrollable
    >

      <v-card>
        <v-card-text>
          <div>
            <p class="field-title">{{ $t('author') }}:</p>
            <p>{{ getAuthor }}</p>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <div>
            <p class="field-title">{{ $t('date.time') }}:</p>
            <p>{{ getDate }}</p>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <p class="field-title">{{ $t('comment') }}:</p>
          <p>{{ getValue }}</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="show = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import nestedFieldCell from '@/mixins/nestedFieldCell';
import { DATE_FORMATS } from '@/constants';

const { DEFAULT_DATE_FORMAT } = DATE_FORMATS;

export default {
  name: 'CommentCell',
  mixins: [nestedFieldCell],
  data() {
    return {
      show: false,
      isClickable: false,
    };
  },
  computed: {
    getAuthor() {
      return this.item.userName;
    },
    getDate() {
      return moment(this.item.createOn).format(DEFAULT_DATE_FORMAT);
    },
    getValue() {
      return this.value || this.column.placeholder;
    },
    dynamicClass() {
      return `item-id-${this.item.id}`;
    },
  },
  methods: {
    showComment() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.comment-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.isClickable {
  color: $base-blue;
}

.field-title {
  color: $base-text-color;
  font-weight: bold;
}
</style>
