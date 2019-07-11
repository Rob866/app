<template>
  <v-layout justify-center >
    <v-flex xs12 sm6>
      <Panel title="Login">
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
            <v-alert
            :value="error"
            color="error">
            {{ error }}
            </v-alert>
          <v-btn  type="submit" color="teal lighten-2" class="white--text" >LOGARSE</v-btn>
        </form>
    </Panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AutentificacionService from '@/services/AutentificacionService'
import Panel from '@/components/Panel'
export default {
  name: 'login',
  data () {
    return {
      email: null,
      password: null,
      error: null

    }
  },
  methods: {
    async login () {
      this.error = null
      try {
        const response = await AutentificacionService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'songs'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data-info,.data-title{
  width: 100%;
}
</style>
