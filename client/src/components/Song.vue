<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <Panel title="Detalles">
          <v-layout>
            <v-flex xs6>
              {{ song.titulo }}<br>
              {{ song.album }}<br>
              {{ song.genero}}
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
                :player-height="280">
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
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    const song = await songsService.show(songId)
    this.song = song.data
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
