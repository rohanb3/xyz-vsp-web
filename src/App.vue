<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/login" active>Login</router-link>
      <span>|</span>
      <router-link to="/dashboard">Dashboard</router-link>
      <span>|</span>
      <router-link to="/customers">Customers</router-link>
    </div>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
