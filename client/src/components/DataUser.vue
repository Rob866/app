<template>
  <div>
    <Panel title="Información de Usuario">
      <div slot="section"
      style="position: absolute;top:0;right:0">
      <v-btn
      color="white"
      flat
      @click="openDialog">
      <v-icon>edit</v-icon>
      </v-btn>
      </div>
      <v-layout>
        <v-flex wrap>
          <v-text-field
          readonly
          type="email"
          label="Email"
          v-model="dataUser.email">
          </v-text-field>
           <v-text-field
          type="password"
          label="Password"
          v-model="dataUser.pass">
          </v-text-field>
        </v-flex>
      </v-layout>
    </Panel>
     <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline teal lighten-2"
          primary-title
        >
          Cambiar Password
        </v-card-title>
        <v-card-text>
          <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
          <v-layout wrap>
              <v-flex xs12
              style="text-align: left"
              >
               <button
             style="padding: 10px"
             class=" teal lighten-2 white--text"
             @click="sameEmail">
             Dejar email anterior
             </button>
             <v-text-field
              type="email"
              label="Email"
              :rules="emailRules"
              v-model="userData.email">
            </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                required
                type="password"
                :rules="required"
                label="Antiguo Password"
                v-model="userData.oldpass">
               </v-text-field>
            </v-flex>
            <v-flex xs12>
               <v-text-field
                required
                :rules="required"
                type="password"
                label="Nuevo Password"
                v-model="userData.password">
              </v-text-field>
            </v-flex>
            <v-alert
            :value="err"
            color="error">
            {{ err }}
            </v-alert>
          </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="salir"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="sendData"
          >
            Cambiar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import { mapState } from 'vuex'
import AutentificacionService from '@/services/AutentificacionService'

export default {
  name: 'DataUser',
  data () {
    return {
      dataUser: {
        pass: null,
        email: null
      },
      userData: {
        password: null,
        email: null,
        oldpass: null
      },
      required: [(value) => !!value || 'campo requerido'],
      emailRules: [
        v => !!v || 'El email es querido',
        v => /.+@.+/.test(v) || 'El email debe de ser valido'
      ],
      dialog: false,
      valid: true,
      err: null
    }
  },
  methods: {
    salir () {
      console.log('Salir')
      this.dialog = false
    },
    openDialog () {
      console.log('open dialog')
      this.dialog = true
    },
    sameEmail () {
      this.userData.email = this.user.email
    },
    async sendData () {
      this.err = null
      if (this.$refs.form.validate()) {
        try {
          const response = await AutentificacionService.update({
            userId: this.user.id,
            user: {
              email: this.userData.email, oldpassword: this.userData.oldpass, password: this.userData.password
            }})
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.dialog = false
          this.$router.push({name: 'songs'})
        } catch (error) {
          this.err = error.response.data.error
        }
      }
    }
  },
  computed: {
    ...mapState([
      'user',
      'token'
    ])
  },
  mounted () {
    this.dataUser.email = this.user.email
    this.dataUser.pass = '*******'
  },
  components: {
    Panel
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
