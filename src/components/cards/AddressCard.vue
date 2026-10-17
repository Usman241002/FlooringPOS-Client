<script setup>
import Body from '@/components/typography/Body.vue'
import Label from '@/components/typography/Label.vue'
import Tag from '@/components/Tag.vue'

const { address, active } = defineProps({
  address: {
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
  <div :class="['address-container', 'card', { active }]" @click="handleClick">
    <AFlex class="left" vertical>
      <Body class="title">
        {{ address.addressLine1 + (address.addressLine2 ? ', ' + address.addressLine2 : '') }}
      </Body>
      <Label>{{ address.postcode }}</Label>
    </AFlex>

    <Tag>0 rooms</Tag>
  </div>
</template>

<style scoped>
.address-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-lg);

  cursor: pointer;
  transition: box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.address-container:hover {
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.address-container:focus-visible {
  outline: 2px solid var(--border);
  outline-offset: 2px;
}

.address-container.active {
  background-color: var(--primary-bg) !important;
  border: 2px solid var(--primary);
}

.left {
  gap: var(--space-md);
  align-items: flex-start;
}

.title {
  font-weight: bold;
  color: var(--text-primary);
}
</style>
