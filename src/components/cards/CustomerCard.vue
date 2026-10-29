<script setup>
import Body from '@/components/typography/Body.vue'
import Label from '@/components/typography/Label.vue'
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
  <div :class="['customer-card-container', 'card', { 'active-card': active }]" @click="handleClick">
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
}

.left {
  gap: var(--space-md);
  align-items: center;
}

.customer-name {
  color: var(--text-primary);
}
</style>
