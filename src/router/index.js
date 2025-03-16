// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component:() => import('@/views/Register.vue')
  }
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router