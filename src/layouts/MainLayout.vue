<script setup>
import SideBar from '@/components/SideBar.vue'
</script>
<template>
  <ALayout :style="{ minHeight: '100vh' }">
    <ALayoutSider><SideBar /></ALayoutSider>
    <ALayout>
      <ALayoutContent><RouterView /></ALayoutContent>
    </ALayout>
  </ALayout>
</template>
