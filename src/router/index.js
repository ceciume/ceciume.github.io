// Composables
import { createRouter, createWebHistory } from 'vue-router'

// import LoginPage from '../views/LoginPage.vue'
// import HomePage from '../views/HomePage.vue'


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
    component: () =>import('@/views/HomePage')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
