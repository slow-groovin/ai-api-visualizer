import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/debug',
      name: 'debug',
      component: defineAsyncComponent(() => import('../views/Debug.vue'))
    },
    {
      path: '/debug/environment',
      name: 'environment-info',
      component: defineAsyncComponent(() => import('../views/debug/EnvironmentInfo.vue'))
    },
    {
      path: '/debug/toast',
      name: 'toast-debug',
      component: defineAsyncComponent(() => import('../views/debug/ToastDebug.vue'))
    },
    {
      path: '/debug/color-test',
      name: 'color-test',
      component: defineAsyncComponent(() => import('../views/debug/ColorTest.vue'))
    }
  ]
})

export default router