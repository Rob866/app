<template>
  <div>
    <Panel title="Información de Usuario">
      <div slot="section"
      style="position: absolute;top:0;right:0">
      <v-btn
      color="white"
      flat>
      <v-icon>edit</v-icon>
      </v-btn>
      </div>
      <v-layout>
        <v-flex wrap>
          <v-text-field
          readonly
          type="email"
          label="Email"
          v-model="user.email">
          </v-text-field>
           <v-text-field
          readonly
          type="password"
          label="Password"
          v-model="pass">
          </v-text-field>
        </v-flex>
      </v-layout>
    </Panel>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import { mapState } from 'vuex'
export default {
  name: 'DataUser',
  data () {
    return {
      pass: '**********'
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
