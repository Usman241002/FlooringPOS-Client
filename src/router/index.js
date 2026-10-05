import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import SalesView from '@/views/SalesView.vue'
import MeasurementsView from '@/views/MeasurementsView.vue'
import QuotesView from '@/views/QuotesView.vue'
import CustomersView from '@/views/CustomersView.vue'
import ProductsView from '@/views/ProductsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import ComponentPreview from '@/views/ComponentPreview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'sell',
          name: 'Sale',
          component: SalesView,
        },
        {
          path: 'measurements',
          name: 'Measurements',
          component: MeasurementsView,
        },
        {
          path: 'quotes',
          name: 'Quotes',
          component: QuotesView,
        },
        {
          path: 'customers',
          name: 'Customers',
          component: CustomersView,
        },
        {
          path: 'products',
          name: 'Products',
          component: ProductsView,
        },
        {
          path: 'settings',
          name: 'Settings',
          component: SettingsView,
        },
        {
          path: 'components',
          name: 'Components',
          component: ComponentPreview,
        },
      ],
    },
  ],
})

export default router
