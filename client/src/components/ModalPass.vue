<template>
    <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
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
              <v-flex xs12>
             <v-text-field
              readonly
              type="email"
              label="Email"
              v-model="userData.email">
            </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                required
                type="password"
                label="Antiguo Password"
                v-model="userData.oldpass">
               </v-text-field>
            </v-flex>
            <v-flex xs12>
               <v-text-field
                required
                type="password"
                label="Nuevo Password"
                v-model="userData.newpass">
              </v-text-field>
            </v-flex>
          </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="changeState"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="test"
          >
            Cambiar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      valid: true,
      userData: {
        newpass: null,
        email: null,
        oldpass: null
      }
    }
  },
  methods: {
    changeState () {
      this.$emit('changeState', { state: false })
    },
    test () {
      console.log('cambiar')
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.userData.email = this.user.email
    this.userData.oldpass = null
  },
  props: ['dialog']
}
</script>
<style>

</style>
