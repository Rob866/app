<template>
  <div id="app">
    <v-app>
      <HeaderPage/>
      <v-container>
        <router-view/>
      </v-container>
    </v-app>
  </div>
</template>

<script>

import HeaderPage from '@/components/Header'
export default {
  name: 'App',
  components: {
    HeaderPage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
