<script setup>
import Body from '@/components/Typography/Body.vue'
import Label from '@/components/Typography/Label.vue'
import Tag from '@/components/Tag.vue'

const { customer } = defineProps({
  customer: {
    firstName: String,
    lastName: String,
    phone: String,
  },
})
</script>

<template>
  <AFlex class="customer-card-container card">
    <AFlex class="left"
      ><AAvatar :class="['avatar']">
        {{ customer.firstName[0] }}{{ customer.lastName[0] }}
      </AAvatar>
      <AFlex class="customer-details" vertical>
        <Body class="customer-name">{{ customer.firstName }} {{ customer.lastName }}</Body>
        <Label>{{ customer.phone }}</Label>
      </AFlex>
    </AFlex>
    <Tag variant="primary">Tag</Tag>
  </AFlex>
</template>

<style scoped>
.customer-card-container {
  align-items: center;
  justify-content: space-between;
}

.left {
  gap: var(--space-md);
  justify-content: space-between;
  align-items: center;
}

.customer-name {
  color: var(--text-primary);
}

.avatar {
  color: var(--text-secondary);
  background-color: var(--border);
  font-weight: bold;
}
</style>
