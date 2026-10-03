<script setup>
defineProps({
  variant: 'primary' | 'secondary' | 'outlined' | 'danger',
})
</script>

<template>
  <button :class="[variant, 'container']" :type="type" @click="emit('click', $event)">
    <span class="content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: var(--space-sm) var(--space-md);

  border-radius: var(--space-sm);

  cursor: pointer;
}

.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  gap: var(--space-sm);
  position: relative;
  z-index: 1;

  font: var(--body);
  text-transform: capitalize;
}

.primary {
  color: var(--surface);
  background-color: var(--primary);
  border: 1px solid transparent;
}

/* Secondary */
.secondary {
  color: var(--text-primary);
  background-color: var(--surface);
  border: 1px solid var(--border);
}

/* Outlined */
.outlined {
  color: var(--text-primary);
  background-color: transparent;
  border: 1px solid var(--border);
}

.danger {
  color: var(--danger);
  background-color: var(--danger-bg);
  border: 1px solid var(--danger);
}
</style>
