<script setup>
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Header>
    <template #title>Customers</template>
    <template #subtitle>1235 customer records</template>
    <template #actions>
      <Button><PlusOutlined />New Customer</Button>
    </template>
  </Header>
</template>
