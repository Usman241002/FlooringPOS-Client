<script setup>
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <AFlex class="paper" vertical>
    <AFlex v-if="slots.header" class="header">
      <slot name="header" />
    </AFlex>

    <AFlex class="body" vertical>
      <slot />
    </AFlex>
  </AFlex>
</template>

<style scoped>
.header {
  display: flex;
  gap: 0.25rem;
  justify-content: space-between;
  align-items: center;
}
</style>
