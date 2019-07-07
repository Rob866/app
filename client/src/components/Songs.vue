<template>
  <Panel :title="'Canciones'">
    <div slot="action">
       <v-btn
        @click="navigateTo({name: 'creatSong'})"
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
    <div v-for="song in songs" :key="song.id">
      <v-layout elevation-2 mb-4>
        <v-flex xs6>
          <div class="song song-titulo">
           {{ song.titulo }}
          </div>
          <div class=" song song-artista">
          {{ song.artista }}
          </div>
          <div class="song song-album">
          {{ song.album }}
          </div>
         <v-btn  @click="navigateTo({name: 'song', params: { songId: song.id}})"
           color="teal lighten-2"
           class="white--text" >Detalles</v-btn>

        </v-flex>
        <v-flex xs6>
          <img :src="song.albumImagenUrl"  width=50% alt="" srcset="">
        </v-flex>
      </v-layout>
    </div>
  </Panel>
</template>

<script>
import songsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  name: 'songs',
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    // do a request to the backend for all the songs
    let response = await songsService.index()
    this.songs = response.data
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song-titulo{
  font-size: 35px;
}
.song-artista{
font-size: 30px;
}
.song-album{
font-size: 25px;
}

</style>
