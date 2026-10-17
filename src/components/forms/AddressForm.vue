<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/typography/Body.vue'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, onUnmounted, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import useCustomersStore from '@/stores/customersStore.js'
import useAddressesStore from '@/stores/addressesStore.js'

const { address } = defineProps({
  address: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])
const customersStore = useCustomersStore()
const addressesStore = useAddressesStore()

const form = reactive({
  addressLine1: '',
  addressLine2: '',
  postcode: '',
})

function resetForm() {
  Object.assign(form, {
    addressLine1: '',
    addressLine2: '',
    postcode: '',
  })
}

watch(
  () => address,
  (address) => {
    Object.assign(form, {
      addressLine1: address?.addressLine1 ?? '',
      addressLine2: address?.addressLine2 ?? '',
      postcode: address?.postcode ?? '',
    })
  },
  { immediate: true },
)

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

async function handleSubmit() {
  const customerId = customersStore.customer?.id

  if (!customerId) {
    message.error('Select a customer before saving an address')
    return
  }

  try {
    if (address?.id) {
      await addressesStore.updateAddress(address.id, { ...form })
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
  if (!address?.id) return

  try {
    await addressesStore.deleteAddress(address.id)
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
          {{ address ? 'Edit Address' : 'Add New Address' }}
        </Body>

        <Body class="subtitle">
          {{
            customersStore.customer
              ? `For ${customersStore.customer.firstName} ${customersStore.customer.lastName}`
              : 'Select a customer to manage addresses.'
          }}
        </Body>
      </AFlex>

      <AButton aria-label="Close form" type="text" @click="handleCancel">
        <CloseOutlined />
      </AButton>
    </template>

    <AForm :model="form" layout="vertical" @finish="handleSubmit">
      <AFormItem
        :rules="[{ required: true, whitespace: true, message: 'Enter address line 1' }]"
        label="Address line 1"
        name="addressLine1"
      >
        <AInput v-model:value="form.addressLine1" placeholder="House number and street" />
      </AFormItem>

      <AFormItem label="Address line 2" name="addressLine2">
        <AInput
          v-model:value="form.addressLine2"
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

      <AFlex class="button-section">
        <AButton
          v-if="address?.id"
          :disabled="customersStore.loading"
          :loading="customersStore.loading"
          danger
          @click="handleDelete"
        >
          <DeleteOutlined />
          Delete
        </AButton>

        <AButton
          :disabled="customersStore.loading || !customersStore.customer"
          :loading="customersStore.loading"
          html-type="submit"
          type="primary"
        >
          <PlusOutlined v-if="!address" />
          {{ address ? 'Save Changes' : 'Add Address' }}
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
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
  width: 100%;
}
</style>
