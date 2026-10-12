<script setup>
import Tag from '@/components/Tag.vue'
</script>

<template>
  <AFlex :style="{ padding: '1rem' }" gap="16" vertical>
    <AFlex gap="8">
      <Tag class="primary">Quote sent</Tag>
      <Tag class="success">Paid</Tag>
      <Tag class="danger">Draft</Tag>
      <Tag class="warning">Overdue</Tag>
      <Tag class="inactive">Inactive</Tag>
    </AFlex>
  </AFlex>
</template>

<style scoped></style>
