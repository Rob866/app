<template>
  <v-toolbar  fixed color="teal lighten-2">
    <v-toolbar-title class="white--text">
        <span
          to="root"
          class="white--text" style="cursor: pointer">
          <h5>SONGS TRACKER</h5>
        </span>
      </v-toolbar-title>
    <v-spacer></v-spacer>
  <v-toolbar-items>
    <v-btn flat dark
      to="login"
      class="white--text">
      Login
    </v-btn>
    <v-btn flat dark
      to="register"
      class="white--text">
      Sign Up
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
