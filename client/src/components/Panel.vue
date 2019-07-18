<template>
  <v-layout row  justify-center align-center  wrap>
      <v-flex xs12  class="data-title elevation-2 mt-4">
        <v-toolbar  color="teal lighten-2" style="height: 55px">
        <v-toolbar-title class="white--text" style="padding-bottom: 10px">{{ title }}</v-toolbar-title>
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
export default {
  props: ['title']
}
</script>
<style scoped>
  .data-info,.data-title{
  width: 100%;
}
</style>
