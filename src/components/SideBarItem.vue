<template>
  <AFlex class="side-bar-item-container">
    <slot />
  </AFlex>
</template>

<style scoped>
.side-bar-item-container {
  font: var(--body);
  color: #aab5c5;
  gap: var(--space-md);
  padding: var(--space-md);
  transition: color 0.2s ease-in-out;
  border: 1px solid transparent;
  border-radius: var(--space-sm);
}

.side-bar-item-container:hover {
  color: var(--surface);
  cursor: pointer;
}
</style>
