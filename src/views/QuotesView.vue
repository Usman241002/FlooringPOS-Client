<script setup>
import { PlusOutlined, SaveFilled } from '@ant-design/icons-vue'
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'

const date = new Date()

const formattedDate = date.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})
</script>
<template>
  <Header>
    <template #title>Quote Id</template>
    <template #subtitle>Created {{ formattedDate }}</template>
    <template #actions>
      <Button><PlusOutlined />New Sale</Button>
      <Button variant="secondary"><SaveFilled /> Save Draft</Button>
    </template>
  </Header>
</template>
