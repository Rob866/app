<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img :src="image" width="100%" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img
              src="http://www.sclance.com/pngs/ethereum-logo-png/ethereum_logo_png_452096.png"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">Musica Md</v-list-tile-title>
        </v-list-tile>
        <v-divider />
        <v-list-tile @click="navigateTo('songs')" avatar class="v-list-item">
          <v-list-tile-action>
            <v-icon>format_align_justify</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="'Canciones'" />
        </v-list-tile>
        <v-list-tile v-if="isUserLogin" @click="navigateTo('data')" avatar class="v-list-item">
          <v-list-tile-action>
            <v-icon>person_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="getName" />
        </v-list-tile>
        <v-list-tile v-if="isUserLogin" @click="navigateTo('content')" avatar class="v-list-item">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="'dashboard'" />
        </v-list-tile>
        <v-list-tile v-if="!isUserLogin" @click="navigateTo('login')" avatar class="v-list-item">
          <v-list-tile-action>
            <v-icon>perm_identity</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="'Login'" />
        </v-list-tile>
        <v-list-tile v-if="!isUserLogin" @click="navigateTo('register')" avatar class="v-list-item">
          <v-list-tile-action>
            <v-icon>how_to_reg</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="'Registrarse'" />
        </v-list-tile>
        <v-list-tile v-if="isUserLogin" class="v-list-item text-xs-center mt-3" avatar>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="'Settings'" />
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="white" dark flat class="white--text" v-on="on">
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile>
                <v-list-tile-title @click="logOut" style="cursor: pointer">Salir</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      responsive: true,
      window: {
        width: null,
        height: null
      }
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push({ name: `${route}` })
    },
    logOut () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser,', null)
      this.$router.push({
        name: 'login'
      })
    },
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  },
  computed: {
    ...mapState(['drawer', 'isUserLogin', 'user', 'image']),
    getName () {
      const userTest = this.user.email
      const index = userTest.split('').indexOf('@')
      return userTest.slice(0, index)
    },
    inputValue: {
      get () {
        return this.drawer
      },
      set (val) {
        this.$store.dispatch('setDrawer', val)
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {
    if (this.window.width > 520) {
      this.inputValue = true
      // this.onResponsiveInverted()
      // window.addEventListener('resize', this.onResponsiveInverted)
    }
  }
}
</script>

<style scoped>
#app-drawer .v-list__tile {
  border-radius: 4px;
}
#app-drawer .v-list__tile--buy {
  margin-top: auto;
  margin-bottom: 17px;
}
#app-drawer .v-image__image--contain {
  top: 9px;
  height: 60%;
}
#app-drawer .search-input {
  margin-bottom: 30px !important;
  padding-left: 15px;
  padding-right: 15px;
}
#app-drawer div.v-responsive.v-image > div.v-responsive__content {
  overflow-y: auto;
}
#app-drawer .v-list__tile {
  border-radius: 4px;
}
#app-drawer .v-list__tile--buy {
  margin-top: auto;
  margin-bottom: 17px;
}
#app-drawer .v-image__image--contain {
  top: 9px;
  height: 60%;
}
#app-drawer .search-input {
  margin-bottom: 30px !important;
  padding-left: 15px;
  padding-right: 15px;
}
#app-drawer div.v-responsive.v-image > div.v-responsive__content {
  overflow-y: auto;
}

@media screen and (max-width: 520px) {
  #app-drawer{
    width: 220px !important;
  }
}
</style>
