<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <AFlex>
    <RouterLink :to="to" class="side-bar-item-container">
      <slot />
    </RouterLink>
  </AFlex>
</template>

<style scoped>
.side-bar-item-container {
  display: flex;
  align-items: center;
  gap: var(--space-md);

  width: 100%;
  box-sizing: border-box;

  font: var(--body);
  color: #aab5c5;
  padding: var(--space-md);

  border: 1px solid transparent;
  border-radius: var(--space-sm);

  text-decoration: none;

  transition:
    color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}

.side-bar-item-container:hover {
  color: var(--surface);
  cursor: pointer;
}

.side-bar-item-container.router-link-active {
  color: var(--surface);
}
</style>
