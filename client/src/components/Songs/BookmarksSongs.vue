<template>
  <Panel title="Favoritos">
    <v-data-table
      :headers ="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
      <template slot="items" slot-scope="props">
        <tr @click="navigateTo({name: 'song', params: { songId: props.item.Song.id}})">
          <td class="text-xs-right">
          {{ props.item.Song.titulo }}
          </td>
          <td class="text-xs-right">
          {{ props.item.Song.artista }}
        </td>
        </tr>
      </template>
    </v-data-table>
  </Panel>
</template>
<script>
import Panel from '@/components/Panel'
import bookmarksService from '@/services/BookmarksService'

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
        sortBy: 'date',
        descending: true
      },
      bookmarks: []
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    const user = this.$store.state.user
    if (!user) {
      return
    }
    try {
      const dataBookmarks = await bookmarksService.index({
        userId: user.id
      })
      this.bookmarks = dataBookmarks.data
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
