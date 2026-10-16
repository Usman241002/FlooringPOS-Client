<script setup>
import Body from '@/components/typography/Body.vue'
import Label from '@/components/typography/Label.vue'
import Tag from '@/components/Tag.vue'

const { address } = defineProps({
  address: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <AFlex class="address-container" justify="space-between">
    <AFlex class="left" vertical>
      <Body class="title">{{
        address.addressLine1 + (address.addressLine2 ? ', ' + address.addressLine2 : '')
      }}</Body>
      <Label>{{ address.postcode }}</Label>
    </AFlex>

    <Tag>0 rooms</Tag>
  </AFlex>
</template>

<style scoped>
.address-container {
  background: var(--bg);
  border-radius: 0.5rem;
  border: 1px solid transparent;
  width: 100%;
  padding: var(--space-lg);
  align-items: center;
}

.title {
  font-weight: bold;
  color: var(--text-primary);
}
</style>
