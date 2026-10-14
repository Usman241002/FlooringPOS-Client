<script setup></script>

<template>
  <AFlex class="card" vertical>
    <AFlex class="header">
      <slot name="header" />
    </AFlex>

    <AFlex class="body">
      <slot />
    </AFlex>
  </AFlex>
</template>

<style scoped>
.header {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  justify-content: space-between;
}

.body {
}
</style>
