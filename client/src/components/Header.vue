<template>
  <v-toolbar  fixed color="teal lighten-2" style="height: 55px">
    <v-toolbar-title class="white--text">
        <v-btn
          flat
          dark
          class="white--text"
          style="fontsize: 22px"
          @click="navigateTo('songs')">
            <img src="../assets/song.png"  width="180px" alt="" srcset="">
        </v-btn>
      </v-toolbar-title>
  <v-toolbar-title>
    <v-btn
      flat
      dark
      class="white--text"
      style="fontsize: 22px"
      @click="navigateTo('songs')">
      Canciones
    </v-btn>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items>
     <v-btn
      v-if="isUserLogin"
      flat
      dark
      class="white--text"
      style="fontsize: 22px; text-decoration: none"
      @click="navigateTo('data')"
      >
      <v-icon>person_outline</v-icon><span>{{ $store.state.user.email | name }}</span>
    </v-btn>
    <v-btn
      v-if="isUserLogin"
      flat
      dark
      class="white--text"
      style="fontsize: 22px; text-decoration: none"
      @click="navigateTo('content')">
      <v-icon>dashboard</v-icon>
    </v-btn>
    <v-btn
      v-if="!isUserLogin"
      flat dark
      class="white--text"
      style="fontsize: 22px"
      @click="navigateTo('login')">
      login
    </v-btn>
    <v-btn
      flat
      dark
      v-if="!isUserLogin"
      class="white--text"
      style="fontsize: 22px; text-decoration: none"
      @click="navigateTo('register')">
      Registro
      </v-btn>
    <div
    v-if="isUserLogin"
    class="text-xs-center mt-3">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
          dark
          flat
          class="white--text"
          v-on="on">
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
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLogin'
    ])
  },
  methods: {
    navigateTo (route) {
      this.$router.push({name: `${route}`})
    },
    logOut () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  },
  filters: {
    name (value) {
      const index = value.split('').indexOf('@')
      return value.slice(0, index)
    }
  }
}
</script>

<style scoped>

</style>
