<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/typography/Body.vue'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, onUnmounted, reactive, watch } from 'vue'
import useCustomersStore from '@/stores/customersStore.js'
import { message } from 'ant-design-vue'

const emit = defineEmits(['close'])
const customersStore = useCustomersStore()

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

watch(
  () => customersStore.customer,
  (customer) => {
    Object.assign(form, {
      firstName: customer?.firstName ?? '',
      lastName: customer?.lastName ?? '',
      phone: customer?.phone ?? '',
    })
  },
  { immediate: true },
)

async function handleSubmit() {
  try {
    if (customersStore.customer?.id) {
      await customersStore.updateCustomer(customersStore.customer.id, form)
      message.success('Customer updated successfully')
    } else {
      await customersStore.createCustomer(form)
      message.success('Customer added successfully')
    }

    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to save customer')
  }
}

async function handleDelete(id) {
  await customersStore.deleteCustomer(id)
  message.success('Customer deleted successfully')
  Object.assign(form, {
    firstName: '',
    lastName: '',
    phone: '',
  })
  emit('close')
}

function handleCancel() {
  Object.assign(form, {
    firstName: '',
    lastName: '',
    phone: '',
  })

  emit('close')
}

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    handleCancel()
  }
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
            customersStore.customer
              ? `${customersStore.customer.firstName} ${customersStore.customer.lastName}`
              : 'Enter the customer details below.'
          }}
        </Body>
      </AFlex>
      <AButton type="text" @click="handleCancel">
        <CloseOutlined />
      </AButton>
    </template>

    <AForm
      :model="form"
      class="customer-form"
      layout="vertical"
      @finish="handleSubmit"
      @keydown.esc="handleCancel"
    >
      <ARow :gutter="[16, 0]">
        <ACol :span="12">
          <AFormItem label="First name" name="firstName">
            <AInput v-model:value="form.firstName" placeholder="Enter first name" />
          </AFormItem>
        </ACol>
        <ACol :span="12">
          <AFormItem label="Last name" name="lastName">
            <AInput v-model:value="form.lastName" placeholder="Enter last name" />
          </AFormItem>
        </ACol>
        <ACol :span="24">
          <AFormItem label="Phone number" name="phone">
            <AInput v-model:value="form.phone" placeholder="Enter phone number" />
          </AFormItem>
        </ACol>
      </ARow>
      <AFlex class="button-section">
        <AButton
          v-if="customersStore.customer"
          :disabled="customersStore.loading"
          :loading="customersStore.loading"
          danger
          type="default"
          @click="handleDelete(customersStore.customer.id)"
          ><DeleteOutlined /> Delete</AButton
        >
        <AButton
          :disabled="customersStore.loading"
          :loading="customersStore.loading"
          html-type="submit"
          type="primary"
        >
          <PlusOutlined v-if="!customersStore.customer" />
          {{ customersStore.customer ? 'Save Changes' : 'Add Customer' }}
        </AButton>
      </AFlex>
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

.button-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
  width: 100%;
}
</style>
