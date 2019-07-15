<template>
  <Panel title="Vistas recientes">
    <v-data-table
      :headers ="headers"
      :pagination.sync="pagination"
      :items="songs">
      <template slot="items" slot-scope="props">
        <tr @click="navigateTo({name: 'song', params: { songId: props.item.Song.id}})">
          <td class="text-xs-left">
          {{ props.item.Song.titulo }}
          </td>
          <td class="text-xs-left">
          {{ props.item.Song.artista }}
        </td>
        </tr>
      </template>
    </v-data-table>
  </Panel>
</template>
<script>
import Panel from '@/components/Panel'
import historySongsService from '@/services/historySongsService'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Titulo',
          value: 'titulo'
        },
        {
          text: 'Artista',
          value: 'artista'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      songs: []
    }
  },
  computed: {
    ...mapState([
      'isUserLogin',
      'user'
    ])
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    if (!this.user) {
      return
    }
    try {
      this.songs = (await historySongsService.index({
        userId: this.user.id
      })).data
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    Panel
  }
}
</script>
<style>
tr{
  cursor: pointer;
}

</style>
