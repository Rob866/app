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
        <td class="text-xs-left">
          {{ props.item.titulo }}
        </td>
        <td class="text-xs-left">
          {{ props.item.artista }}
        </td>
        <td>
          <v-btn
          flat
          color="teal lighten-2"
          @click="$router.push({name: 'song', params: { songId: props.item.id}})">
          <v-icon>visibility</v-icon>
          </v-btn>
        </td>
      </template>
      </v-data-table>
    </Panel>
</template>
<script>
import Panel from '@/components/Panel'
import UserService from '@/services/UserService'
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
  components: {
    Panel
  },
  async mounted () {
    try {
      this.songs = (await UserService.index({})).data
      console.log(this.songs)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
<style>

</style>
