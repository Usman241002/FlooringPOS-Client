<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
})
</script>
<template>
  <AFlex :class="['tag-container', variant]">
    <Label><slot></slot></Label>
  </AFlex>
</template>

<style scoped>
.tag-container {
  border-radius: 999px;
  padding: 0.25rem 0.5rem;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.primary {
  color: var(--primary);
  background-color: var(--primary-bg);
}

.success {
  color: var(--success);
  background-color: var(--success-bg);
}

.warning {
  color: var(--warning);
  background-color: var(--warning-bg);
}

.danger {
  color: var(--danger);
  background-color: var(--danger-bg);
}

.inactive {
  color: var(--inactive);
  background-color: var(--inactive-bg);
}
</style>
