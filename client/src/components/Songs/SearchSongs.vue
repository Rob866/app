<template>
  <Panel title="Busqueda">
    <v-text-field
      v-model="busqueda"
      label="Busqueda para el nombre del artista, album y genero ">
    </v-text-field>
  </Panel>
</template>
<script>
import Panel from '@/components/Panel'
import _ from 'lodash'

export default {
  name: 'SearchSong',
  data () {
    return {
      busqueda: ''
    }
  },
  watch: {
    busqueda: _.debounce(async function (value) {
      const route = {name: 'songs'}
      if (this.busqueda !== '') {
        route.query = {
          search: this.busqueda
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.busqueda = value
      }
    }
  },
  components: {
    Panel
  }

}
</script>
<style>

</style>
