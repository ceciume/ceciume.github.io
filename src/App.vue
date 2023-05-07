<template>
  <v-app>
    <NavBar v-if="$route.path !=='/'"></NavBar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <AppFooter v-if="showAppFooter"
               :links="links"></AppFooter>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  components: {
    NavBar,
    AppFooter,

  }, data () {
    return {
      links: [
        { text: '首页', url: 'http://127.0.0.1:3000/home' },
        { text: '关于', url: 'http://127.0.0.1:3000/home' },
        { text: '隐私', url: 'https://www.example.com/link3' }
      ]
    }
  },
  name: 'App',
  computed:{
    showAppFooter () {
    return this.$route.path !== '/' && this.$route.path !== '/mineral-query' && this.$route.path !== '/home';
  }
  }
  

}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
