```vue
<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import useAddressesStore from '@/stores/addressesStore.js'
import useRoomsStore from '@/stores/roomsStore.js'
import BaseForm from '@/components/forms/BaseForm.vue'

const emit = defineEmits(['close'])

const props = defineProps({
  room: {
    type: Object,
    default: null,
  },
})

const addressesStore = useAddressesStore()
const roomsStore = useRoomsStore()

const form = reactive({
  name: '',
  length: null,
  width: null,
})

const unit = ref('m')

const units = [
  { label: 'Metres (m)', value: 'm' },
  { label: 'Centimetres (cm)', value: 'cm' },
  { label: 'Feet (ft)', value: 'ft' },
  { label: 'Inches (in)', value: 'in' },
]

const unitFactors = {
  m: 1,
  cm: 0.01,
  ft: 0.3048,
  in: 0.0254,
}

const rules = {
  name: [
    {
      required: true,
      whitespace: true,
      message: 'Please enter a room name',
    },
  ],
  length: [
    {
      required: true,
      type: 'number',
      min: 0.01,
      message: 'Enter a length greater than 0',
    },
  ],
  width: [
    {
      required: true,
      type: 'number',
      min: 0.01,
      message: 'Enter a width greater than 0',
    },
  ],
}

const isEditing = computed(() => !!props.room?.id)

const area = computed(() => {
  if (form.length == null || form.width == null) return null
  if (form.length <= 0 || form.width <= 0) return null

  return (form.length * form.width).toFixed(2)
})

const addressLabel = computed(() => {
  const address = addressesStore.address

  return address
    ? [address.line1, address.city, address.postcode].filter(Boolean).join(', ')
    : 'No address selected'
})

const round = (value, places) => Number(value.toFixed(places))

const displayLength = computed({
  get: () => (form.length == null ? null : round(form.length / unitFactors[unit.value], 2)),
  set: (value) => {
    form.length = value == null ? null : round(value * unitFactors[unit.value], 3)
  },
})

const displayWidth = computed({
  get: () => (form.width == null ? null : round(form.width / unitFactors[unit.value], 2)),
  set: (value) => {
    form.width = value == null ? null : round(value * unitFactors[unit.value], 3)
  },
})

watch(
  () => props.room,
  (room) => {
    Object.assign(form, {
      name: room?.name ?? '',
      length: room?.length ?? null,
      width: room?.width ?? null,
    })
  },
  { immediate: true },
)

async function handleSubmit() {
  try {
    const payload = {
      name: form.name,
      length: form.length,
      width: form.width,
    }

    if (isEditing.value) {
      await roomsStore.updateRoom(props.room.id, payload)
      message.success('Room updated successfully')
    } else {
      const addressId = addressesStore.address?.id

      if (!addressId) {
        message.error('Please select an address before adding a room')
        return
      }

      await roomsStore.createRoom(addressId, payload)
      message.success('Room added successfully')
    }

    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to save room')
  }
}

async function handleDelete() {
  if (!props.room?.id) return

  try {
    await roomsStore.deleteRoom(props.room.id)
    message.success('Room deleted successfully')
    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to delete room')
  }
}

function handleCancel() {
  emit('close')
}
</script>

<template>
  <BaseForm
    :loading="roomsStore.loading"
    :model="form"
    :submit-label="isEditing ? 'Save Changes' : 'Add Room'"
    :subtitle="addressLabel"
    :title="isEditing ? 'Edit room' : 'New room'"
    @close="handleCancel"
    @submit="handleSubmit"
  >
    <ARow :gutter="[16, 16]">
      <ACol :span="12">
        <AFormItem :rules="rules.name" label="Room name" name="name">
          <AInput v-model:value="form.name" placeholder="e.g. Living room" />
        </AFormItem>

        <AFormItem label="Measurement unit">
          <AButtonGroup>
            <AButton
              v-for="item in units"
              :key="item.value"
              :type="unit === item.value ? 'primary' : 'default'"
              @click="unit = item.value"
            >
              {{ item.value }}
            </AButton>
          </AButtonGroup>
        </AFormItem>

        <ARow :gutter="[16, 0]">
          <ACol :span="12">
            <AFormItem :rules="rules.length" label="Length" name="length">
              <AInputNumber
                v-model:value="displayLength"
                :min="0"
                :precision="2"
                :step="0.01"
                placeholder="0.00"
                style="width: 100%"
              >
                <template #addonAfter>{{ unit }}</template>
              </AInputNumber>
            </AFormItem>
          </ACol>

          <ACol :span="12">
            <AFormItem :rules="rules.width" label="Width" name="width">
              <AInputNumber
                v-model:value="displayWidth"
                :min="0"
                :precision="2"
                :step="0.01"
                placeholder="0.00"
                style="width: 100%"
              >
                <template #addonAfter>{{ unit }}</template>
              </AInputNumber>
            </AFormItem>
          </ACol>
        </ARow>
      </ACol>

      <ACol :span="12">
        <div class="room-square">
          <template v-if="area !== null">
            <div class="room-square-area">{{ area }} m²</div>
            <div class="room-square-dims">
              {{ displayWidth?.toFixed(2) }} {{ unit }}
              ×
              {{ displayLength?.toFixed(2) }} {{ unit }}
            </div>
          </template>

          <div v-else class="room-square-dims">Enter width and length</div>
        </div>
      </ACol>
    </ARow>

    <template #actions>
      <AButton
        v-if="isEditing"
        :disabled="roomsStore.loading"
        danger
        type="default"
        @click="handleDelete"
      >
        <DeleteOutlined />
        Delete
      </AButton>
    </template>

    <template #submit-icon>
      <PlusOutlined v-if="!isEditing" />
    </template>
  </BaseForm>
</template>

<style scoped>
.room-square {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 240px;
  aspect-ratio: 13 / 9;
  margin: 0 auto;
  box-sizing: border-box;
  background: var(--primary-bg);
  border: 2px solid var(--primary);
  border-radius: 4px;
}

.room-square-area {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 500;
}

.room-square-dims {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>
