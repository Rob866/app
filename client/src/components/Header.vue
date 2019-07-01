<template>
  <v-toolbar  fixed color="teal lighten-2">
    <v-toolbar-title class="white--text">
        <v-btn
          flat dark
          to="home"
          class="white--text"
          style="font-size: 22px">
          <h5>SONGS TRACKER</h5>
        </v-btn>
      </v-toolbar-title>
    <v-spacer></v-spacer>
  <v-toolbar-items>
    <v-btn
      v-if="!$store.state.isUserLogin"
      flat dark
      to="login"
      class="white--text">
      Login
    </v-btn>
    <v-btn flat dark
      v-if="!$store.state.isUserLogin"
      to="register"
      class="white--text">
      Registrarse
    </v-btn>
  </v-toolbar-items>
</v-toolbar>

</template>

<script>
export default {

}
</script>

<style scoped>

</style>
