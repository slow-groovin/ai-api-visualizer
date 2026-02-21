import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Help from '../views/Help.vue'
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
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/debug',
      name: 'debug',
      component: defineAsyncComponent(() => import('../views/Debug.vue'))
    },
    {
      path: '/debug/database',
      name: 'database-test',
      component: defineAsyncComponent(() => import('../views/debug/DatabaseTest.vue'))
    },
    {
      path: '/debug/drizzle-orm',
      name: 'drizzle-orm-test',
      component: defineAsyncComponent(() => import('../views/debug/DrizzleOrmTest.vue'))
    },
    {
      path: '/debug/environment',
      name: 'environment-info',
      component: defineAsyncComponent(() => import('../views/debug/EnvironmentInfo.vue'))
    },
    {
      path: '/debug/opfs-viewer',
      name: 'opfs-viewer',
      component: defineAsyncComponent(() => import('../views/debug/OpfsViewer.vue'))
    },
    {
      path: '/debug/replace',
      name: 'replace',
      component: defineAsyncComponent(() => import('../views/debug/Replace.vue'))
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