<template>
  <div>
    <Panel title="Ranking">
       <Carousel></Carousel>
    </Panel>
    <v-layout>
      <v-flex class="xs12">
         <SearchSongs/>
        <Panel title='Canciones'>
            <v-layout justify-center mb-4  wrap >
                <v-flex xs12>
      <v-card>
        <v-container grid-list-lg fluid>
          <v-layout row wrap>
            <v-flex
              v-for="song in songs"
              :key="song.id"
              xs12
              sm6
              md4
              d-flex
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="song.albumImagenUrl"
                  :lazy-src="song.albumImagenUrl"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                <v-btn  @click="navigateTo({name: 'song', params: { songId: song.id}})"
                  color="teal lighten-2"
                  style="margin-top: 50%; transform: translateY(-50%); opacity: .7;font-size: 10px"
                  class="white--text" >{{song.titulo}}</v-btn>
                  <template v-slot:placeholder>
                    <v-layout
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
            </v-layout>
        </Panel>
      </v-flex>
    </v-layout>
    </div>
</template>

<script>
import songsService from '@/services/SongsService'
import Panel from '@/components/Panel'
import Loading from '@/components/Loading'
import SearchSongs from '@/components/Songs/SearchSongs'
import Carousel from '@/components/Songs/Carousel'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState([
      'isUserLogin',
      'loading'
    ])
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler  (value) {
        try {
          let response = (await songsService.index(value)).data
          this.songs = response
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  components: {
    Panel,
    SearchSongs,
    Loading,
    Carousel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song-titulo{
  color: black;
  font-size: 25px;
}
.song-artista{
 color: black;
 font-size: 20px;
 }

.contenedor {
  position: relative;
  background-color:  white;
  height: 300px;
  margin-bottom: 2px;
  }

.fondo {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 5%;
  left:50%;
  transform: translateX(-50%);
  border-radius: 50%;
  z-index: 0;
}
.titulo{
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
</style>
