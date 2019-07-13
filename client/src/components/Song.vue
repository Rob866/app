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
              color="teal lighten-2"
              @click="toNavigate" class="white--text">editar
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
                <img :src="song.albumImagenUrl"  width=100% alt="" srcset="">
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
  </div>
</template>
<script>
import songsService from '@/services/SongsService'
import bookmarksService from '@/services/BookmarksService'
import Panel from '@/components/Panel'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      song: {},
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLogin'
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
    toNavigate () {
      this.$router.push({name: 'edit', params: {songId: this.song.id}})
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
