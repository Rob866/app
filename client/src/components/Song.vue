<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <Panel title="Detalles">
          <v-layout>
            <v-flex xs6>
              {{ song.titulo }}<br>
              {{ song.album }}<br>
              {{ song.genero}}<br>
              <v-btn
              v-if="isUserLogin"
              color="teal lighten-2"
                @click="toNavigate('edit')" class="white--text">editar
              </v-btn>
              <v-btn
              v-if="isUserLogin"
              color="red lighten-2"
              @click="dialogDelete" class="white--text">ELiminar
              </v-btn>
              <v-btn
              v-if="isUserLogin && !bookmark"
              color="teal lighten-2"
              @click="setAsBookmark" class="white--text">añadir como favorito
              </v-btn>
              <v-btn
              v-if="isUserLogin && bookmark"
              color="teal lighten-2"
              @click="removeAsBookmark" class="white--text">quitar como favorito
              </v-btn>
            </v-flex>
            <v-flex xs6>
                <img :src="song.albumImagenUrl" width=100% alt="" srcset="">
                Send My Love (To Your New Lover)
            </v-flex>
          </v-layout>
        </Panel>
      </v-flex>
      <v-flex xs6 class="ml-2">
          <v-layout>
            <v-flex xs12>
              <Panel title="Youtube Video">
                <youtube
                :video-id="song.youtubeId"
                :player-height="292">
                </youtube>
              </Panel>
            </v-flex>
          </v-layout>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <Panel title="Tab">
          <v-textarea
          class="text-area"
          rows="35"
          readonly
          v-model="song.tab">
          </v-textarea>
      </Panel>
      </v-flex>
      <v-flex xs6 class="ml-2">
          <v-layout>
            <Panel title="Letra">
              <v-textarea
              class="text-area"
              rows="35"
              readonly
              v-model="song.letra">
               </v-textarea>
            </Panel>
          </v-layout>
      </v-flex>
    </v-layout>
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
          Advertencia
        </v-card-title>

        <v-card-text>
          Realmente quiere eliminar la canción?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="deleteSong"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</div>
</template>
<script>
import songsService from '@/services/SongsService'
import bookmarksService from '@/services/BookmarksService'
import Panel from '@/components/Panel'
import { mapState } from 'vuex'
import historySongsService from '@/services/historySongsService'
export default {
  data () {
    return {
      dialog: false,
      song: {},
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLogin',
      'user'
    ])
  },
  watch: {
    async song (value) {
      if (!this.isUserLogin) {
        return
      }
      try {
        this.bookmark = (await bookmarksService.index({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    toNavigate (route) {
      this.$router.push({name: `${route}`, params: {songId: this.song.id}})
    },
    dialogDelete () {
      this.dialog = true
    },
    async deleteSong () {
      try {
        const songId = this.song.id
        // await historySongsService.delete(songId)
        // await bookmarksService.deleteAll(songId)
        await songsService.delete(songId)
        this.$router.push({name: 'songs'})
      } catch (err) {
        console.log(err)
      }
    },
    async setAsBookmark () {
      try {
        this.bookmark = (await bookmarksService.post({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
        console.log(this.bookmark)
      } catch (err) {
        console.log(err)
      }
    },
    async removeAsBookmark () {
      try {
        const test = (await bookmarksService.delete(this.bookmark.id)).data
        this.bookmark = null
        console.log(test)
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    try {
      this.song = (await songsService.show(songId)).data
      if (this.isUserLogin) {
        await historySongsService.post({
          userId: this.user.id,
          songId: songId
        })
      }
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    Panel
  }
}
</script>
<style scoped>
.text-area{
  font-family: monospace;
  font-size: 14px
}
</style>
