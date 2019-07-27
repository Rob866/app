<template>
  <div style="position: relative">
  <Panel title="Favoritos">
    <v-btn
      v-if="isUserLogin"
      color="red lighten-2"
      medium
      absolute
      right
      @click="deleteBookmarks" class="white--text">
      BORRAR FAVORITOS
    </v-btn>
    <v-data-table
      :headers ="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
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
          @click="navigateTo({name: 'song', params: { songId: props.item.id}})">
          <v-icon>visibility</v-icon>
          </v-btn>
        </td>
        </tr>
      </template>
    </v-data-table>
  </Panel>
  </div>
</template>
<script>
import Panel from '@/components/Panel'
import BookmarksService from '@/services/BookmarksService'
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
      bookmarks: []
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
    },
    async deleteBookmarks () {
      try {
        await BookmarksService.deleteAll(this.user.id)
        this.bookmarks = []
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    if (!this.isUserLogin) {
      return
    }
    try {
      this.bookmarks = (await BookmarksService.index({
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
