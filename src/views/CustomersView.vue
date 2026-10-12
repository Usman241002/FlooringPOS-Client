<script setup>
import Header from '@/components/Header.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Header>
    <template #title>Customers</template>
    <template #subtitle>1235 customer records</template>
    <template #actions>
      <AButton type="primary"><PlusOutlined />New Customer</AButton>
    </template>
  </Header>
</template>
