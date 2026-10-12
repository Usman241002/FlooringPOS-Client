<script setup>
import Header from '@/components/Header.vue'
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
      <AButton type="primary"><PlusOutlined />New Sale</AButton>
      <AButton type="default"><SaveFilled /> Save Draft</AButton>
    </template>
  </Header>
</template>
