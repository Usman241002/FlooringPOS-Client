<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/Typography/Body.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <Card class="address-list">
    <template #header>
      <AFlex vertical>
        <Body class="title"> Address List </Body>
        <Body class="subtitle"> 0 saved addresses </Body>
      </AFlex>
      <AButton type="primary"><PlusOutlined />Add Address</AButton>
    </template>
  </Card>
</template>

<style scoped>
.address-list {
  min-width: 100%;
  gap: 1rem;
  height: fit-content;
  align-self: flex-start;
}

.title {
  color: var(--text-primary);
  font: var(--body);
  font-weight: bold;
}

.subtitle {
  color: var(--text-secondary);
  font: var(--body);
}
</style>
