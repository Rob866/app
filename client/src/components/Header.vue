<template>
  <v-toolbar  fixed color="teal lighten-2" style="height: 55px">
    <v-toolbar-title class="white--text">
        <v-btn
          flat dark
          @click="toNavigate('home')"
          class="white--text"
          style="font-size: 22px">
          <img src="../assets/song.png"  width="180px" alt="" srcset="">
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
      v-if="$store.state.isUserLogin"
      flat
      dark
      @click="toNavigate('content')"
      class="white--text">
     <v-icon>dashboard</v-icon>
    </v-btn>
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
    <div
    v-if="$store.state.isUserLogin"
    class="text-xs-center mt-3">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
          dark
          flat
          class="white--text"
          v-on="on"
        >
          <v-icon style="font-size: 30px">settings</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile>
        <v-list-tile-title @click="logOut" style="cursor: pointer">Salir</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
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
