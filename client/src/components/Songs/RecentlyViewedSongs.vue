<template>
  <div style="position: relative">
    <Panel title="Historial">
      <div slot="section">
      <v-btn
      v-if="isUserLogin"
      color="red lighten-2"
      style="position: absolute; top: 0 ;right: 0"
      @click="deleteHistorial" class="white--text">
      ELIMINAR HISTORIAL
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
      'isUserLogin',
      'user'
    ])
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteHistorial () {
      try {
        await historySongsService.delete(this.user.id)
        this.songs = []
      } catch (err) {
        console.log(err)
      }
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
