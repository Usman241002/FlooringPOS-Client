<script setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'
</script>
<template>
  <Header>
    <template #title>Products</template>
    <template #subtitle>126 active - 14 inactive</template>
    <template #actions>
      <Button><PlusOutlined />Add Product</Button>
    </template>
  </Header>
</template>
