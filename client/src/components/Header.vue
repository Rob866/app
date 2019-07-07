<template>
  <v-toolbar  fixed color="teal lighten-2">
    <v-toolbar-title class="white--text">
        <v-btn
          flat dark
          @click="toNavigate('home')"
          class="white--text"
          style="font-size: 22px">
          <h5>SONGS TRACKER</h5>
        </v-btn>
      </v-toolbar-title>
  <v-toolbar-title>
    <v-btn
      flat dark
      @click="toNavigate('songs')"
      class="white--text">
      Browser
    </v-btn>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items>
    <v-btn
      v-if="!$store.state.isUserLogin"
      flat dark
      @click="toNavigate('login')"
      class="white--text">
      Login
    </v-btn>
    <v-btn flat dark
      v-if="!$store.state.isUserLogin"
      @click="toNavigate('register')"
      class="white--text">
      Registrarse
    </v-btn>
    <v-btn flat dark
      v-if="$store.state.isUserLogin"
      @click="logOut"
      class="white--text">
      Log Out
    </v-btn>
  </v-toolbar-items>
</v-toolbar>

</template>

<script>
export default {
  methods: {
    toNavigate (route) {
      this.$router.push({name: route})
    },

    logOut () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }

}
</script>

<style scoped>

</style>
