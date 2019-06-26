<template>
  <div>
    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email">
    <br>
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password">
    <br>
    <button @click="register">Register</button>
    </div>
</template>

<script>
import AutentificacionService from '@/services/AutentificacionService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AutentificacionService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
