<script setup>
import BaseForm from '@/components/forms/BaseForm.vue'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
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
  try {
    await customersStore.deleteCustomer(id)
    message.success('Customer deleted successfully')

    Object.assign(form, {
      firstName: '',
      lastName: '',
      phone: '',
    })

    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to delete customer')
  }
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
  <BaseForm
    :loading="customersStore.loading"
    :model="form"
    :submit-label="customersStore.customer ? 'Save Changes' : 'Add Customer'"
    :subtitle="
      customersStore.customer
        ? `${customersStore.customer.firstName} ${customersStore.customer.lastName}`
        : 'Enter the customer details below.'
    "
    :title="customersStore.customer ? 'Edit Customer' : 'Add New Customer'"
    @close="handleCancel"
    @submit="handleSubmit"
  >
    <ARow :gutter="[16, 0]">
      <ACol :span="12">
        <AFormItem
          :rules="[{ required: true, whitespace: true, message: 'Enter a first name' }]"
          label="First name"
          name="firstName"
        >
          <AInput v-model:value="form.firstName" placeholder="Enter first name" />
        </AFormItem>
      </ACol>

      <ACol :span="12">
        <AFormItem
          :rules="[{ required: true, whitespace: true, message: 'Enter a last name' }]"
          label="Last name"
          name="lastName"
        >
          <AInput v-model:value="form.lastName" placeholder="Enter last name" />
        </AFormItem>
      </ACol>

      <ACol :span="24">
        <AFormItem label="Phone number" name="phone">
          <AInput v-model:value="form.phone" placeholder="Enter phone number" />
        </AFormItem>
      </ACol>
    </ARow>

    <template #actions>
      <AButton
        v-if="customersStore.customer?.id"
        :disabled="customersStore.loading"
        danger
        type="default"
        @click="handleDelete(customersStore.customer.id)"
      >
        <DeleteOutlined />
        Delete
      </AButton>
    </template>

    <template #submit-icon>
      <PlusOutlined v-if="!customersStore.customer" />
    </template>
  </BaseForm>
</template>
