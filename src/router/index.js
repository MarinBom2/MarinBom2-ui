import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/Signup.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue'),
  },
  {
    path: '/news',
    name: 'NewsView',
    component: () => import('@/views/NewsView.vue'),
  },
  {
    path: '/ask',
    name: 'AskView',
    component: () => import('@/views/AskView.vue'),
  },
  {
    path: '/jobs',
    name: 'JobsView',
    component: () => import('@/views/JobsView.vue'),
  },
  {
    path: '/user',
    name: 'UserView',
    component: () => import('@/views/UserView.vue'),
  },
  {
    path: '/item',
    name: 'ItemView',
    component: () => import('@/views/ItemView.vue'),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/NotFound.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
