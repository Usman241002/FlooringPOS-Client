<script setup>
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'
import { PlusOutlined, SaveFilled } from '@ant-design/icons-vue'

const date = new Date()

const formattedDate = date.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})
</script>
<template>
  <Header>
    <template #title>New Sale</template>
    <template #subtitle>{{ formattedDate }}</template>
    <template #actions>
      <Button><PlusOutlined />New Sale</Button>
      <Button variant="secondary"><SaveFilled /> Save Draft</Button>
    </template>
  </Header>
</template>
