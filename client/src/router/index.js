import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
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
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/content',
      name: 'content',
      component: Content
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
      component: CreateSong
    },
    {
      path: '/songs/:songId',
      name: 'song',
      component: Song
    },
    {
      path: '/songs/:songId/edit',
      name: 'edit',
      component: EditSong
    }

  ]
})
