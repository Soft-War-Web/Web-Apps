import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home-c',
    name: 'HomeC',
    component: () => import('../views/HomeC.vue')
  },
  {
    path: '/home-n',
    name: 'HomeN',
    component: () => import('../views/HomeN.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */'../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
