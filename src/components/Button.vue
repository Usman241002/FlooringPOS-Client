<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outlined', 'danger'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button :class="[props.variant, 'container']" :type="props.type" @click="emit('click', $event)">
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
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: space-around;
  align-items: center;

  gap: var(--space-sm);

  font: var(--body);
  text-transform: capitalize;
}

.primary {
  color: var(--surface);
  background-color: var(--primary);
  border: 1px solid transparent;
}

.secondary {
  color: var(--text-primary);
  background-color: var(--surface);
  border: 1px solid var(--border);
}

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
