<script setup>
import Label from '@/components/Typography/Label.vue'

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
  width: fit-content;
}

.tag-container :deep(.label) {
  color: inherit;
  font-weight: 600;
}

.primary {
  color: var(--primary) !important;
  background-color: var(--primary-bg);
}

.success {
  color: var(--success) !important;
  background-color: var(--success-bg);
}

.warning {
  color: var(--warning) !important;
  background-color: var(--warning-bg);
}

.danger {
  color: var(--danger) !important;
  background-color: var(--danger-bg);
}

.inactive {
  color: var(--inactive) !important;
  background-color: var(--inactive-bg);
}
</style>
