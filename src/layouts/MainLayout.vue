<template>
  <ALayout :style="{ minHeight: '100vh' }">
    <ALayoutSider>Sider</ALayoutSider>
    <ALayout>
      <ALayoutContent><RouterView /></ALayoutContent>
    </ALayout>
  </ALayout>
</template>
