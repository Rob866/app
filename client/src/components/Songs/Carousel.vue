<template>
  <carousel
  :autoplay="true"
  :scrollPerPage="true" :perPageCustom="[[480, 2], [768, 3]]">
    <slide v-for="song in songs" :key="song.id" style="position: relative">
      <div style="position: absolute; top:0; right: 50px">
         <div
         style="position: absolute; top:42%; left: 50%; transform: translate(-50%,-50%);color:black"
         >{{ song.count }}</div>
         <v-icon color="teal lighten-2" style="font-size: 35px">favorite</v-icon>
      </div>
      <div  @click="$router.push({name: 'song', params: { songId: song.song.id}})"
                  style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);font-size: 14px; opacity:.7;
                  background-color: #008080; color: white; padding-top: 5px; padding: 5px; border-radius: 2px; cursor: pointer"
                  color="white">{{song.song.titulo}}</div>
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

</style>
