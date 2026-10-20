<script setup>
import Body from '@/components/typography/Body.vue'
import Label from '@/components/typography/Label.vue'
import { EditOutlined } from '@ant-design/icons-vue'

const { address } = defineProps({
  address: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit'])

function handleEdit(address) {
  emit('edit', address)
}
</script>

<template>
  <AFlex class="address-container card">
    <RouterLink :to="`/measurements/${address.id}`" class="link">
      <AFlex class="left" vertical>
        <Body class="title"
          >{{ address.addressLine1 }}{{ address.addressLine2 ? ', ' + address.addressLine2 : '' }}
        </Body>
        <Label>{{ address.postcode }}</Label>
      </AFlex>
    </RouterLink>

    <AButton type="text" @click="handleEdit(address)"><EditOutlined /></AButton>
  </AFlex>
</template>

<style scoped>
.address-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 var(--space-lg) 0 0;

  transition: box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.address-container:hover {
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.link:focus-visible {
  outline: 2px solid var(--border);
  outline-offset: 2px;
}

.left {
  align-items: flex-start;
}

.title {
  font-weight: bold;
  color: var(--text-primary);
}

.link {
  flex: 1;
  padding: var(--space-lg);
}
</style>
