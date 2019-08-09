<template>
  <v-toolbar  fixed color="teal lighten-2" style="height: 55px">
  <v-toolbar-title class="show">
    <v-btn
      flat
      dark
      id="item"
      class="white--text boton"
      style="font-size: 16px"
      @click="navigateTo('songs')">
      Canciones
    </v-btn>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items>
     <v-btn
      flat
      dark
      id="item"
      class="white--text boton menu"
      style="font-size: 16px"
      @click="toggle">
      MENU
    </v-btn>
  </v-toolbar-items>
  <v-toolbar-items class="show">
     <v-btn
      v-if="isUserLogin"
      flat
      dark
      class="white--text boton"
      style="font-size: 16px; text-decoration: none"
      @click="navigateTo('data')"
      >
      <v-icon>person_outline</v-icon><span>{{ $store.state.user.email | name }}</span>
    </v-btn>
    <v-btn
      v-if="isUserLogin"
      flat
      dark
      class="white--text boton"
      style="font-size: 16px; text-decoration: none"
      @click="navigateTo('content')">
      <v-icon>dashboard</v-icon>
    </v-btn>
    <v-btn
      v-if="!isUserLogin"
      flat dark
      class="white--text boton"
      style="font-size: 16px"
      @click="navigateTo('login')">
      login
    </v-btn>
    <v-btn
      flat
      dark
      v-if="!isUserLogin"
      class="white--text boton"
      style="font-size: 16px; text-decoration: none"
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
          class="white--text boton"
          v-on="on">
          <v-icon style="font-size: 28px">settings</v-icon>
        </v-btn>
      </template>
        <v-list style="cursor: pointer">
          <div @click='logOut'>
          <v-icon>person_outline</v-icon><span style="font-size:16px;margin-left: 5px">Salir</span>
          </div>
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
      'isUserLogin',
      'drawer'
    ])
  },
  methods: {
    toggle () {
      const val = !this.drawer
      this.$store.dispatch('setDrawer', val)
    },
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
#item{
  margin-inline-start: 260px;
}
.menu{
  display: none;
}
@media screen and (max-width: 991px){
img {
  width: 80px;
}
.boton {
  font-size: 12px !important;
}
#item {
  margin-left: 0 !important;
}

@media screen and (max-width: 520px){
.show {
  display: none
  }
.menu {
  display: block;
}
}

}

</style>
