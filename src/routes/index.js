import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/SiteHeader.vue'),
    children: [
      {
        name: 'home',
        path: '/:theme/:lang',
        component: () => import('../pages/home/index.vue'),
        props: true
      }
    ]
  },
  {
    path: '',
    redirect: {
      name: 'home',
      params: {
        theme: 'light',
        lang: navigator.language === 'zh-CN' ? 'zh-CN1' : 'en-US'
      }
    }
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
      params: {
        theme: 'light',
        lang: navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router