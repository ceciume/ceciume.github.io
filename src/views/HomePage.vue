<template>
  <v-app>
    <NavBar @changeView="currentView = $event"></NavBar>
    <v-main>
      <v-container>
        <component :is="currentView"></component>
      </v-container>
    </v-main>
    <AppFooter :links="['首页', '关于', '用户手册']" />
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue'
import NavBar from '../components/NavBar.vue';
import AppFooter from '../components/AppFooter.vue';

import FrontPage from './FrontPage.vue'
import MineralQuery from './MineralQuery.vue'
import DatasetQuery from './DatasetQuery.vue'
import AboutUs from './AboutUs.vue'
import OrderList from './OrderList.vue'
import OrderReview from './OrderReview.vue'
import UTutorial from './UTutorial.vue'



export default defineComponent({
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
