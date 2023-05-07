<template>
  <v-app>
    <v-main>
      <v-container>
        <component :is="currentView"></component>
      </v-container>
    </v-main>
    <AppFooter :links="links" />
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue'
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';

import FrontPage from './FrontPage.vue'
import MineralQuery from './MineralQuery.vue'
import DatasetQuery from './DatasetQuery.vue'
import AboutUs from './AboutUs.vue'
import OrderList from './OrderList.vue'
import OrderReview from './OrderReview.vue'
import UTutorial from './UTutorial.vue'



export default defineComponent({
  data () {
    return {
      links: [
        { text: '首页', url: 'http://127.0.0.1:3000/home' },
        { text: '关于', url: 'http://127.0.0.1:3000/home' },
        { text: '隐私', url: 'https://www.example.com/link3' }
      ]
    }
  },
  components: {
    NavBar,
    AppFooter,
    FrontPage,
    MineralQuery,
    DatasetQuery,
    AboutUs,
    OrderList,
    OrderReview,
    UTutorial
  },
  setup () {
    const currentView = ref('FrontPage')
    return {
      currentView,
    }
  },
})
</script>
