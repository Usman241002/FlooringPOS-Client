<script setup>
import { LayoutOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <AFlex class="sidebar" vertical>
    <AFlex class="logo-container">
      <AFlex class="icon-container">
        <LayoutOutlined class="icon" />
      </AFlex>

      <AFlex vertical>
        <h3>FlooringPOS</h3>
        <h6>Retail POS System</h6>
      </AFlex>
    </AFlex>

    <AFlex class="nav" vertical></AFlex>
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
  color: var(--border) !important;
  font-weight: normal;
  font-size: 0.75rem;
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
</style>
