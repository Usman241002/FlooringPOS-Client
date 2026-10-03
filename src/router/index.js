import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ComponentPreview from '../views/ComponentPreview.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
        },
        {
          path: '/components',
          name: 'ComponentPreview',
          component: ComponentPreview,
        },
      ],
    },
  ],
})

export default router
