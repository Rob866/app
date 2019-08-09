// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueCarousel from 'vue-carousel'
import { VueSpinners } from '@saeris/vue-spinners'

Vue.config.productionTip = false
sync(store, router)
Vue.use(Vuetify)
Vue.use(VueYouTubeEmbed)
Vue.use(VueCarousel)
Vue.use(VueSpinners)

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.isUserLogin) {
      next()
    } else {
      next({name: 'songs'})
      return
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
