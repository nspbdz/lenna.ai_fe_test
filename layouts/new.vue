<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" app> -->
      <!-- <LayoutsTheSideBar></LayoutsTheSideBar> -->
    <!-- </v-navigation-drawer> -->

    <LayoutsTheDefaultBar @sidebar="handleSidebar"></LayoutsTheDefaultBar>

    <v-main>
      <v-container>
        <transition name="layout" mode='out-in'>
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
      // drawer: null
    }
  },
  mounted() {
    const theme = localStorage.getItem('useDarkTheme')
    if (theme) {
      if (theme === 'true') {
        this.$vuetify.theme.dark = true
      } else this.$vuetify.theme.dark = false
    }
  },
  beforeMount() {
    const user = this.$auth.user
    if (user) {
      user.scope = user?.data?.[1] || 'user'
    }
  },
  methods: {
    handleSidebar(val) {
      this.drawer = val
    },
    logout() {
      // console.log('logout')
    },
  },
}
</script>
<style lang="scss" scoped>
.v-card {
  border-radius: 0px 20px 20px 0;
}
</style>
