<template>
  <div class="sidebar-container">
    <div class="sidebar-title">{{title}}</div>
    <nav class="menu-container">
      <router-link
        v-for="item in filteredLinks"
        :key="item.link"
        :to="item.link"
        active-class="sidebar-link-active"
        class="sidebar-link"
      >{{$t(item.titleKey)}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: {
    title: {
      type: String,
      default: '',
    },
    links: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    role() {
      return this.$store.getters.role;
    },
    filteredLinks() {
      return this.links.filter(link => !link.hide.includes(this.role));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.sidebar-title {
  font-size: 14px;
  font-weight: 500;
  color: $base-text-color;
  margin-left: 21px;
  margin-bottom: 18px;
  margin-top: 18px;
}
.sidebar-container {
  width: 210px;
  box-shadow: 3px 0 4px 0 $lhs-shadow-color;
  background-color: $base-white;
  a {
    text-decoration: none;
  }
}
.sidebar-link {
  display: flex;
  font-size: 12px;
  color: $base-text-color;
  margin-left: 21px;
  margin-bottom: 15px;
  &.sidebar-link-active {
    color: $base-blue;
    cursor: default;
  }
}
</style>
