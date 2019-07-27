import Vue from 'vue'
import Router from 'vue-router'
import DataUser from '@/components/DataUser'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Songs'

import Content from '@/components/Songs/Content'
import CreateSong from '@/components/CreateSong'
import Song from '@/components/Song'
import EditSong from '@/components/EditSong'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'songs' }
    },
    {
      path: '/data',
      name: 'data',
      component: DataUser,
      meta: {
        auth: true
      }
    },
    {
      path: '/content',
      name: 'content',
      component: Content,
      meta: {
        auth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/content/create',
      name: 'creatSong',
      component: CreateSong,
      meta: {
        auth: true
      }
    },
    {
      path: '/songs/:songId',
      name: 'song',
      component: Song
    },
    {
      path: '/songs/:songId/edit',
      name: 'edit',
      component: EditSong,
      meta: {
        auth: true
      }
    },
    {
      path: '*',
      redirect: {
        name: 'songs'
      }
    }
  ],
  scrollBehavior (to, from) {
    if (to.name === from.name) {
      return
    }
    return {x: 0, y: 0}
  }
})
