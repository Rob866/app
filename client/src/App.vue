<template>
  <div id="app">
    <v-app>
      <HeaderPage/>
      <Drawer/>
      <v-container style="margin-top: 35px">
      <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter">
        <router-view/>
      </transition>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import HeaderPage from '@/components/Header'
import Drawer from '@/components/Drawer'
import Loading from '@/components/Loading'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      prevHeight: 0
    }
  },
  methods: {
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter (element) {
      const { height } = getComputedStyle(element)
      element.style.height = this.prevHeight
      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },
  components: {
    HeaderPage,
    Drawer,
    Loading
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  margin-left: 120px
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

@media screen and (max-width: 990px){
  #app {
    margin-left: 0;
  }
}

</style>
