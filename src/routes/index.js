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
      },
      {
        name: 'zhComponents',
        path: '/:theme/zh-CN/components',
        component: () => import('../pages/Layout.vue'),
        children: [
          {
            path: 'button',
            component: () => import('../../package/button/docs/zh-CN/index.docs-entry.md')
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirect: {
      name: 'home',
      params: {
        theme: 'light',
        lang: navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US'
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