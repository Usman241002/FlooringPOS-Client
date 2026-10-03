<script setup>
import Tag from '@/components/Tag.vue'
import Button from '@/components/Button.vue'
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

    <AFlex gap="8">
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
      <Button variant="outlined">Quiet Action</Button>
      <Button variant="danger">Danger Action</Button>
    </AFlex>
  </AFlex>
</template>

<style scoped></style>
