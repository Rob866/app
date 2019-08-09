<template>
  <v-layout row  justify-center align-center  wrap id="space">
       <v-flex xs12  class="data-title elevation-2 mt-4">
        <v-toolbar  color="teal lighten-2" style="height: 55px; position: relative">
        <v-toolbar-title class="white--text" style="padding-bottom: 10px">{{ title }}</v-toolbar-title>
        <slot name="section"></slot>
        <slot name="action"></slot>
        </v-toolbar>
    </v-flex>
    <v-flex  xs12  class="data-info pl-4 pr-4 pt-4 pb-4 elevation-2">
      <slot>
          <p>Contenido del slot no definido</p>
      </slot>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'loading'
    ])
  },
  props: ['title']
}
</script>
<style scoped>
#space{
  margin-left: 15px !important;
}
  .data-info,.data-title{
  width: 100%;
}
@media screen and (max-width:992px){
  #space{
    margin-left: 0 !important;
  }
}
</style>
