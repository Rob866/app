<template>
  <Panel title="Canciones creadas">
      <div slot="action">
        <v-btn
        @click="$router.push({name: 'creatSong'})"
        class="cyan accent-2"
        light
        medium
        absolute
        right
        middle
        fab>
        <v-icon>add</v-icon>
        </v-btn>
      </div>
      <v-data-table
      :headers ="headers"
      :pagination.sync="pagination"
      :items="songs">
      <template slot="items" slot-scope="props">
        <tr>
        <td class="text-xs-left">
          {{ props.item.titulo }}
        </td>
        <td class="text-xs-left">
          {{ props.item.artista }}
        </td>
        <td class="text-xs-left">
          <v-btn
          flat
          color="teal lighten-2"
          @click="$router.push({name: 'song', params: { songId: props.item.id}})">
          <v-icon>visibility</v-icon>
          </v-btn>
        </td>
        </tr>
      </template>
      </v-data-table>
    </Panel>
</template>
<script>
import Panel from '@/components/Panel'
import UserService from '@/services/UserService'
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
        },
        {
          text: 'Inspeccionar Canción',
          value: 'ver'
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
      'user'
    ])
  },
  components: {
    Panel
  },
  async mounted () {
    try {
      this.songs = (await UserService.index({ userId: this.user.id })).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
<style>

</style>
