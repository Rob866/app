<template>
    <v-layout column  align-center  class="elevation-2 mt-4">
      <v-flex class="data-title">
        <v-toolbar  color="teal lighten-2">
          <v-toolbar-title class="white--text">Login</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-flex class="data-info pl-4 pr-4 pt-4 pb-4">
          <form   @submit.prevent="login">
            <v-text-field
            v-model="email"
            label="Email">
            </v-text-field>
          <v-text-field
            type="password"
            label="Password"
            v-model="password">
          </v-text-field>
          <div class="error" v-html='error'></div>
          <v-btn  type="submit" color="teal lighten-2" class="white--text" >LOGARSE</v-btn>
          </form>
        </v-flex>
    </v-layout>

</template>

<script>
import AutentificacionService from '@/services/AutentificacionService'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      error: null

    }
  },
  methods: {
    async login () {
      try {
        const response = await AutentificacionService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: red;
}

.data-info,.data-title{
  width: 100%;
}
</style>
