<template>
  <v-app>
    <v-app-bar app
               color="#e5f4f9">
      <v-toolbar-title>U资源样本库</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text
             @click="currentView = 'FrontPage'">
        <v-icon>home</v-icon>
        首页</v-btn>
      <v-btn text
             @click="currentView = 'MineralQuery'">矿床查询</v-btn>
      <v-btn text
             @click="currentView = 'DatasetQuery'">数据集查询</v-btn>
      <v-btn text
             @click="currentView = 'AboutUs'">关于我们</v-btn>
      <v-btn text
             @click="currentView = 'OrderList'">订单列表</v-btn>
      <v-btn text
             @click="currentView = 'OrderReview'">订单审核</v-btn>
      <v-btn text
             @click="currentView = 'UTutorial'">用户手册</v-btn>
      <v-spacer></v-spacer>
      <v-btn text
             @click="$router.push('/')">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <component :is="currentView"></component>
      </v-container>
    </v-main>
    <v-footer class="bg-grey-lighten-1">
      <v-row justify="center"
             no-gutters>
        <v-btn v-for="link in links"
               :key="link"
               color="white"
               variant="text"
               class="mx-2"
               rounded="xl">
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4"
               cols="12">
          Copyright{{ new Date().getFullYear() }} 北京地质研究院 版权所有
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FrontPage from './FrontPage.vue'
import MineralQuery from './MineralQuery.vue'
import DatasetQuery from './DatasetQuery.vue'
import AboutUs from './AboutUs.vue'
import OrderList from './OrderList.vue'
import OrderReview from './OrderReview.vue'
import UTutorial from './UTutorial.vue'



export default defineComponent({
  components: {
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
