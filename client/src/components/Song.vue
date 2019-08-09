<template>
  <div>
     <v-layout wrap>
      <v-flex xs12 md6>
        <Panel title="Detalles">
          <div v-if="userSong" slot="action" style="position: absolute; bottom:-10px; right:10px; transform: translateY(-50%)">
            <div style="color: white; font-size: 12px">Creado por: {{ userSong.email | name }}</div>
          </div>
          <div slot="section" style="position: absolute; top:50%; right:10px; transform: translateY(-50%)">
            <div style="position: absolute; top:12%; left:50%; transform: translateX(-50%); color:#00695C">
              {{ count }}
            </div>
            <v-icon style="color: white; font-size: 30px">favorite</v-icon>
          </div>
          <v-layout>
            <v-flex xs6>
                <v-layout align-center justify-center column>
                <v-flex>
                  <div class="wrapper">
                    <div class="infoData">{{ song.titulo}} </div>
                    <div class="infoData">{{ song.album }}</div>
                    <div class="infoData">{{ song.genero}}</div>
                  </div>
                </v-flex>
                <v-flex>
                  <v-btn
                  v-if="isUserLogin && user.id === song.UserId"
                  color="teal lighten-2"
                  @click="toNavigate('edit')" class="white--text">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex>
                  <v-btn
                  v-if="isUserLogin && !bookmark"
                  color="teal lighten-2"
                  @click="setAsBookmark" class="white--text">
                  <v-icon>favorite_border</v-icon>
                  </v-btn>
                  <v-btn
                  v-if="isUserLogin && bookmark"
                  color="teal lighten-2"
                  @click="removeAsBookmark" class="white--text">
                  <v-icon>favorite</v-icon>
                  </v-btn>
                </v-flex>
                    <v-flex>
                  <v-btn
                  v-if="isUserLogin && user.id === song.UserId"
                  color="red lighten-2"
                  @click="dialogDelete" class="white--text">
                  <v-icon>delete</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs6>
                <img :src="song.albumImagenUrl" width=100%  height=90% alt="" srcset="">
                {{ song.titulo }}
            </v-flex>
          </v-layout>
        </Panel>
      </v-flex>
      <v-flex xs12 md6>
          <v-layout>
            <v-flex xs12>
              <Panel title="Youtube Video">
                <youtube
                :video-id="song.youtubeId"
                :player-height="254">
                </youtube>
              </Panel>
            </v-flex>
          </v-layout>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 md6>
        <Panel title="Tab">
          <div slot="section">
            <v-btn
            flat
            dark
            style="position: absolute; top: 0; right: 0"
            color="white"
            @click="download('tab')">
            <v-icon>cloud_download</v-icon>
          </v-btn>
          </div>
          <v-textarea
          class="text-area"
          rows="35"
          readonly
          v-model="song.tab">
          </v-textarea>
      </Panel>
      </v-flex>
      <v-flex xs12 md6>
          <v-layout>
            <Panel title="Letra">
              <div slot="section">
              <v-btn
              style="position: absolute; top: 0; right: 0"
              color="white"
              flat
              dark
              @click="download('letra')">
              <v-icon>cloud_download</v-icon>
              </v-btn>
             </div>
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
          class="headline teal lighten-2 white--text"
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
import UserService from '@/services/UserService'
import bookmarksService from '@/services/BookmarksService'
import Panel from '@/components/Panel'
import { mapState } from 'vuex'
import historySongsService from '@/services/historySongsService'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  data () {
    return {
      dialog: false,
      song: {},
      bookmark: null,
      count: null,
      userSong: null
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
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
  },
  methods: {
    download (name) {
      const pdfName = name
      let doc = {
        content: null
      }
      if (name === 'tab') {
        doc.content = this.song.tab
      } else if (name === 'letra') {
        doc.content = this.song.letra
      }
      pdfMake.createPdf(doc).download(`${pdfName}.pdf`)
    },
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
        let bookmarks = (await bookmarksService.indexBookmarks(this.song.id)).data
        this.count = bookmarks.fav
      } catch (err) {
        console.log(err)
      }
    },
    async removeAsBookmark () {
      try {
        const songIdBorrado = (await bookmarksService.delete(this.bookmark.id)).data
        console.log(songIdBorrado)
        this.bookmark = null
        let bookmarks = (await bookmarksService.indexBookmarks(this.song.id)).data
        this.count = bookmarks.fav
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
  },
  filters: {
    name (value) {
      const index = value.split('').indexOf('@')
      return value.slice(0, index)
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    try {
      this.song = (await songsService.show(songId)).data
      let bookmarks = (await bookmarksService.indexBookmarks(songId)).data
      this.count = bookmarks.fav
      this.userSong = (await UserService.indexUser({
        userId: this.song.UserId
      })).data
      if (this.isUserLogin) {
        await historySongsService.post({
          userId: this.user.id,
          songId: songId
        })
      }
    } catch (error) {
      console.log(error.response.data.error)
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
  font-size: 14px;
}
.infoData{
  font-size: 25px;
  }
@media screen  and (max-width: 520px){
  .infoData {
    font-size: 18px;
  }
}
</style>
