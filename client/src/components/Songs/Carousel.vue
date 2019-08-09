<template>
  <carousel
  :autoplay="true"
  :scrollPerPage="true" :perPageCustom="[[480, 2], [768, 3]]">
    <slide v-for="song in songs" :key="song.id" style="position: relative">
      <div style="position: absolute; top:0; right: 8%">
         <div
         style="position: absolute; top:42%; left: 50%; transform: translate(-50%,-50%);color:black"
         >{{ song.count }}</div>
         <v-icon id="corazon" color="teal lighten-2" style="font-size: 35px">favorite</v-icon>
      </div>
      <div  @click="$router.push({name: 'song', params: { songId: song.song.id}})"
                  style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);font-size: 18px;
                  color: white; padding-top: 5px; padding: 5px; border-radius: 2px; cursor: pointer;text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;"
                  color="white" class="titulo">{{song.song.titulo}}</div>
      <img style="width: 280px; max-width: 100%;" :src="song.song.albumImagenUrl">
    </slide>
  </carousel>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel'
import bookmarksService from '@/services/BookmarksService'
export default {
  name: 'home',
  data () {
    return {
      songs: []
    }
  },
  async mounted () {
    try {
      let allSongs = (await bookmarksService.indexAll()).data
      this.songs = allSongs.slice(0, 11)
    } catch (err) {
      console.log(err.error)
    }
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 520px){

#corazon {
  font-size: 15px;
  }
  .titulo{
  font-size: 16px !important;
}
}
</style>
