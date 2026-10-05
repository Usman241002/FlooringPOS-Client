<script setup>
import { PlusOutlined, SaveFilled } from '@ant-design/icons-vue'
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'
</script>
<template>
  <Header>
    <template #title>Room Measurements</template>
    <template #subtitle>Quote Id - Customer Name</template>
    <template #actions>
      <Button><PlusOutlined />New Sale</Button>
      <Button variant="secondary"><SaveFilled /> Save Draft</Button>
    </template>
  </Header>
</template>
