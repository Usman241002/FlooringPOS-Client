```vue
<script setup>
import BaseForm from '@/components/forms/BaseForm.vue'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import useCustomersStore from '@/stores/customersStore.js'
import useAddressesStore from '@/stores/addressesStore.js'

const props = defineProps({
  address: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])
const customersStore = useCustomersStore()
const addressesStore = useAddressesStore()

const form = reactive({
  line1: '',
  line2: '',
  postcode: '',
})

function resetForm() {
  Object.assign(form, {
    line1: '',
    line2: '',
    postcode: '',
  })
}

watch(
  () => props.address,
  (address) => {
    Object.assign(form, {
      line1: address?.line1 ?? '',
      line2: address?.line2 ?? '',
      postcode: address?.postcode ?? '',
    })
  },
  { immediate: true },
)

async function handleSubmit() {
  const customerId = customersStore.customer?.id

  if (!customerId) {
    message.error('Select a customer before saving an address')
    return
  }

  try {
    if (props.address?.id) {
      await addressesStore.updateAddress(props.address.id, { ...form })
      message.success('Address updated successfully')
    } else {
      await addressesStore.createAddress(customerId, { ...form })
      message.success('Address added successfully')
    }

    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to save address')
  }
}

async function handleDelete() {
  if (!props.address?.id) return

  try {
    await addressesStore.deleteAddress(props.address.id)
    message.success('Address deleted successfully')
    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to delete address')
  }
}

function handleCancel() {
  resetForm()
  emit('close')
}
</script>

<template>
  <BaseForm
    :loading="addressesStore.loading"
    :model="form"
    :submit-label="address ? 'Save Changes' : 'Add Address'"
    :subtitle="
      customersStore.customer
        ? `For ${customersStore.customer.firstName} ${customersStore.customer.lastName}`
        : 'Select a customer to manage addresses.'
    "
    :title="address ? 'Edit Address' : 'Add New Address'"
    @close="handleCancel"
    @submit="handleSubmit"
  >
    <AFormItem
      :rules="[{ required: true, whitespace: true, message: 'Enter address line 1' }]"
      label="Address line 1"
      name="line1"
    >
      <AInput v-model:value="form.line1" placeholder="House number and street" />
    </AFormItem>

    <AFormItem label="Address line 2" name="line2">
      <AInput
        v-model:value="form.line2"
        placeholder="Flat, area or additional details (optional)"
      />
    </AFormItem>

    <AFormItem
      :rules="[{ required: true, whitespace: true, message: 'Enter a postcode' }]"
      label="Postcode"
      name="postcode"
    >
      <AInput v-model:value="form.postcode" placeholder="e.g. B25 8XX" />
    </AFormItem>

    <template #actions>
      <AButton v-if="address?.id" :disabled="addressesStore.loading" danger @click="handleDelete">
        <DeleteOutlined />
        Delete
      </AButton>
    </template>

    <template #submit-icon>
      <PlusOutlined v-if="!address" />
    </template>
  </BaseForm>
</template>
```
