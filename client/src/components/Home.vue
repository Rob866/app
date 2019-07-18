<template>
  <div class="hello">
     <v-carousel>
      <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      items: [
        {
          src: 'https://www.thedj.co.uk/wp-content/uploads/2014/07/music-colour-splash.jpg'
        },
        {
          src: 'http://melodrive.com/blog/wp-content/uploads/2017/02/score.jpg'
        },
        {
          src: 'https://www.earmaster.com/images/ekstern/understanding_music_theory_19.jpg'
        },
        {
          src: 'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?h=1000&w=1500&fit=crop&mark=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxtclr%3Dfff%26txt%3DFree+Music+Photos%26txtsize%3D120%26txtpad%3D20%26bg%3D80000000%26txtfont%3DAvenir-Heavy%26txtalign%3Dcenter%26w%3D1300&markalign=center%2Cmiddle&txt=pexels.com&txtalign=center&txtsize=60&txtclr=eeffffff&txtfont=Avenir-Heavy&txtshad=10'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
