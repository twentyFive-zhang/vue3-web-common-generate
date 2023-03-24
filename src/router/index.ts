import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import IndexLayout from '@/views/index/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexLayout
    },
    ...routes
  ]
})

router.beforeEach((to, from, next) => {
  console.log({ to, from })
  next()
})

export default router
