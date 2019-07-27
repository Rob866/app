<template>
  <v-layout xs12>
    <v-flex>
      <Ownsongs/>
      <BookmarksSongs/>
      <RecentlyViwedSongs/>
    </v-flex>
  </v-layout>
</template>
<script>
import BookmarksSongs from '@/components/Songs/BookmarksSongs'
import RecentlyViwedSongs from '@/components/Songs/RecentlyViewedSongs'
import Ownsongs from '@/components/Songs/Ownsongs'

export default {
  components: {
    BookmarksSongs,
    RecentlyViwedSongs,
    Ownsongs
  }
}
</script>
<style>

</style>
