<script setup>
import Body from '@/components/Typography/Body.vue'
import Label from '@/components/Typography/Label.vue'
import Tag from '@/components/Tag.vue'

const { customer, active } = defineProps({
  customer: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <div :class="['customer-card-container', 'card', { active }]" @click="$emit('click')">
    <AFlex class="left">
      <AAvatar :class="['avatar', active ? 'active-avatar' : '']">
        {{ customer.firstName?.[0] }}{{ customer.lastName?.[0] }}
      </AAvatar>

      <AFlex class="customer-details" vertical>
        <Body class="customer-name"> {{ customer.firstName }} {{ customer.lastName }} </Body>
        <Label>{{ customer.phone }}</Label>
      </AFlex>
    </AFlex>

    <Tag variant="primary">Tag</Tag>
  </div>
</template>

<style scoped>
.customer-card-container {
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.customer-card-container:hover {
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.customer-card-container:focus-visible {
  outline: 2px solid var(--border);
  outline-offset: 2px;
}

.active {
  background-color: var(--primary-bg) !important;
  border: 2px solid var(--primary);
}

.left {
  gap: var(--space-md);
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

.active-avatar {
  background-color: var(--primary) !important;
  color: var(--primary-bg) !important;
}
</style>
