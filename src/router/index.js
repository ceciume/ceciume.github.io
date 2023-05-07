// Composables
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/UDefault.vue'),
    children: [
      {
        path: '/',
        name: 'ulogin',
        component: () => import('@/views/U-Login.vue'),
      },
    ],
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import('@/views/FrontPage.vue')},
  {
    path: '/mineral-query',
    name: 'mineralQuery',
    component: () => import('@/views/MineralQuery.vue')
  },
  {
    path: '/dataset-query',
    name: 'datasetQuery',
    component: () => import('@/views/DatasetQuery.vue')
  },
  {
    path: '/about-us',
    name: 'aboutUs',
    component: () => import('@/views/AboutUs.vue')
  },
  {
    path: '/order-list',
    name: 'orderList',
    component: () => import('@/views/OrderList.vue')
  },
  {
    path: '/order-review',
    name: 'orderReview',
    component: () => import('@/views/OrderReview.vue')
  },
  {
    path: '/user-tutorial',
    name: 'uTutorial',
    component: () => import('@/views/UTutorial.vue')
  }

 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  // 检查用户是否已经登录
  const isLoggedIn = !!localStorage.getItem('isLoggedIn');

  // 如果用户没有登录并且访问的不是登录页面，则重定向到登录页面
  if (!isLoggedIn && to.name !== 'ulogin') {
    next({ name: 'ulogin' });
    alert("请先登录")
  } else {
    next();
  }
});
export default router
export const FRONT_PAGE_ROUTE = { name: 'frontPage' }
export const MINERAL_QUERY_ROUTE = { name: 'mineralQuery' }
export const Dataset_Query_ROUTE = { name: 'datasetQuery' }
export const About_Us_ROUTE = { name: 'aboutUs' }
export const Order_List_ROUTE = { name: 'orderList' }
export const Order_Review_ROUTE = { name: 'orderReview' }
export const U_Tutorial_ROUTE = { name: 'uTutorial' }
