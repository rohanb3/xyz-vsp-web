<template>
  <div
    class="comment-cell"
    :class="{'dynamicClass': dynamicClass}"
  >
    <p
      class="comment-title"
      ref="comment"
      :title="value"
      @click="showComment"
    >
      {{ getValue }}
    </p>

    <v-dialog
      v-model="show"
      persistent
      max-width="600px"
      scrollable
    >

      <v-card>
        <v-card-text>
          {{ getValue }}
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
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'CommentCell',
  mixins: [nestedFieldCell],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    getValue() {
      return this.value || this.column.placeholder;
    },
    dynamicClass() {
      return `item-id-${this.item.id}`;
    },
    isClickable() {
      return this.$refs.comment.scrollWidth > this.$refs.comment.clientWidth;
    },
  },
  methods: {
    showComment() {
      if (this.isClickable) {
        this.show = true;
      }
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
</style>
