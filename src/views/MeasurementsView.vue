<script setup>
import Header from '@/components/Header.vue'
import { PlusOutlined, SaveFilled } from '@ant-design/icons-vue'
</script>
<template>
  <Header>
    <template #title>Room Measurements</template>
    <template #subtitle>Quote Id - Customer Name</template>
    <template #actions>
      <AButton type="primary"><PlusOutlined />New Sale</AButton>
      <AButton type="default"><SaveFilled /> Save Draft</AButton>
    </template>
  </Header>
</template>
