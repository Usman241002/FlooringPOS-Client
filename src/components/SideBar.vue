<script setup>
import {
  AppstoreOutlined,
  ColumnWidthOutlined,
  FileOutlined,
  LayoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons-vue'
import SideBarItem from '@/components/SideBarItem.vue'

const menuItems = [
  {
    name: 'Sell',
    component: ShoppingCartOutlined,
    to: '/sell',
  },
  { name: 'Measurements', component: ColumnWidthOutlined, to: '/measurements' },
  { name: 'Quotes', component: FileOutlined, to: '/quotes' },
  { name: 'Customers', component: UsergroupAddOutlined, to: '/customers' },
  { name: 'Products', component: AppstoreOutlined, to: '/products' },
  { name: 'Settings', component: SettingOutlined, to: '/settings' },
]
</script>

<template>
  <AFlex class="sidebar" vertical>
    <AFlex class="logo-container">
      <AFlex class="icon-container">
        <LayoutOutlined class="icon" />
      </AFlex>

      <AFlex align="start" vertical>
        <h3>FlooringPOS</h3>
        <h6>Retail POS System</h6>
      </AFlex>
    </AFlex>

    <AFlex class="nav" vertical>
      <SideBarItem v-for="item in menuItems" :key="item.name" :to="item.to" class="nav-item">
        <component :is="item.component" class="sidebar-item-icon" />
        {{ item.name }}
      </SideBarItem>
    </AFlex>
  </AFlex>
</template>

<style scoped>
.sidebar {
  gap: var(--space-lg);
  padding: var(--space-lg) var(--space-lg);
  width: auto;
  height: 100%;
  background-color: var(--secondary);
}

.logo-container {
  text-align: center;
  align-items: center;
  justify-content: start;
  gap: var(--space-sm);
  padding: var(--space-sm);
}

.logo-container h3 {
  color: var(--surface) !important;
  font-weight: normal;
  font-size: 1rem;
}

.logo-container h6 {
  color: #aab5c5;
  font-weight: normal;
  font-size: 0.75rem;
}

.nav {
  gap: var(--space-sm);
}

.icon-container {
  align-items: center;
  justify-content: center;
  padding: var(--space-sm);
  background-color: var(--primary);
  border-radius: var(--space-sm);
}

.icon {
  color: var(--surface);
  font-size: 1.25rem;
}

.sidebar-item-icon {
  font-size: 1.25rem;
}

.sidebar-item-icon:hover {
  color: var(--surface);
  cursor: pointer;
}
</style>
