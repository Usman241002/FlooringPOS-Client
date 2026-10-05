<script setup>
import SideBar from '@/components/SideBar.vue'
</script>
<template>
  <ALayout :style="{ minHeight: '100vh' }">
    <ALayoutSider><SideBar /></ALayoutSider>
    <ALayout>
      <ALayoutContent :style="{ background: 'var(--bg)' }"><RouterView /></ALayoutContent>
    </ALayout>
  </ALayout>
</template>
