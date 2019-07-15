<template>
  <v-layout xs12>
    <v-flex>
      <BookmarksSongs/>
      <RecentlyViwedSongs/>
    </v-flex>
  </v-layout>
</template>
<script>
import BookmarksSongs from '@/components/Songs/BookmarksSongs'
import RecentlyViwedSongs from '@/components/Songs/RecentlyViewedSongs'
export default {

  components: {
    BookmarksSongs,
    RecentlyViwedSongs
  }
}
</script>
<style>

</style>
