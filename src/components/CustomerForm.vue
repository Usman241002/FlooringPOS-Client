<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/Typography/Body.vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { reactive } from 'vue'

const emit = defineEmits(['close'])

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
})

async function handleSubmit() {}

function handleCancel() {
  Object.assign(form, {
    firstName: '',
    lastName: '',
    phone: '',
  })

  emit('close')
}
</script>

<template>
  <Card :style="{ width: '100%' }">
    <template #header>
      <AFlex vertical>
        <Body class="title">
          {{ customer ? 'Edit Customer' : 'Add New Customer' }}
        </Body>

        <Body class="subtitle">
          {{
            customer
              ? `${customer.firstName} ${customer.lastName}`
              : 'Enter the customer details below.'
          }}
        </Body>
      </AFlex>
      <AButton danger type="default" @click="handleCancel">
        <CloseOutlined />
      </AButton>
    </template>

    <AForm :model="form" layout="vertical" @finish="handleSubmit" @keydown.esc="handleCancel">
      <ARow :gutter="[16, 0]">
        <ACol :span="12">
          <AFormItem label="First name" name="firstName">
            <AInput v-model:value="form.firstName" placeholder="Enter product name" />
          </AFormItem>
        </ACol>
        <ACol :span="12">
          <AFormItem label="Last name" name="lastName">
            <AInput v-model:value="form.lastName" placeholder="Enter product name" />
          </AFormItem>
        </ACol>
        <ACol :span="24">
          <AFormItem label="Phone number" name="phone">
            <AInput v-model:value="form.phone" placeholder="Enter phone number" />
          </AFormItem>
        </ACol>
      </ARow>
    </AForm>
  </Card>
</template>

<style scoped>
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
