<template>
  <v-layout justify-center >
    <v-flex xs12 md6>
      <Panel title="Login">
        <v-form
         ref="form"
         v-model="valid"
         lazy-validation>
          <v-text-field
          required
          :rules="emailRules"
          v-model="user.email"
          type="email"
          label="Email">
          </v-text-field>
          <v-text-field
          required
          :rules="required"
          type="password"
          label="Password"
          v-model="user.password">
          </v-text-field>
            <v-alert
            :value="err"
            color="error">
            {{ err }}
            </v-alert>
          <v-btn  @click="login" color="teal lighten-2" class="white--text" >LOGARSE</v-btn>
        </v-form>
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
      valid: true,
      user: { email: null, password: null },
      required: [(value) => !!value || 'Campo requerido'],
      emailRules: [
        v => !!v || 'El email es requerido',
        v => /.+@.+/.test(v) || 'El email debe de ser valido'
      ],
      err: null
    }
  },
  methods: {
    async login () {
      this.err = null
      if (this.$refs.form.validate()) {
        try {
          const response = await AutentificacionService.login({
            email: this.user.email,
            password: this.user.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({name: 'songs'})
        } catch (error) {
          this.err = error.response.data.error
        }
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
