<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/typography/Body.vue'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import useAddressesStore from '@/stores/addressesStore.js'
import useRoomsStore from '@/stores/roomsStore.js'

const emit = defineEmits(['close'])

const addressesStore = useAddressesStore()
const roomsStore = useRoomsStore()

const props = defineProps({
  room: {
    type: Object,
    default: null,
  },
})

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
  if (!form.length || !form.width) return null

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

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

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
          {{ form.name || (isEditing ? 'Edit room' : 'New room') }}
        </Body>
        <Body class="subtitle">{{ addressLabel }}</Body>
      </AFlex>

      <AButton type="text" @click="handleCancel">
        <CloseOutlined />
      </AButton>
    </template>

    <ARow :gutter="[16, 16]">
      <ACol :span="12">
        <AForm
          id="room-form"
          :model="form"
          :rules="rules"
          class="room-form"
          layout="vertical"
          @finish="handleSubmit"
        >
          <ARow :gutter="[16, 0]">
            <ACol :span="24">
              <AFormItem label="Room name" name="name">
                <AInput v-model:value="form.name" placeholder="e.g. Living room" />
              </AFormItem>
            </ACol>

            <ACol :span="24">
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
            </ACol>

            <ACol :span="12">
              <AFormItem label="Length" name="length">
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
              <AFormItem label="Width" name="width">
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
        </AForm>
      </ACol>

      <ACol :span="12">
        <div class="room-square">
          <template v-if="area">
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

      <ACol :span="24">
        <AFlex class="button-section">
          <AButton
            v-if="isEditing"
            :disabled="roomsStore.loading"
            :loading="roomsStore.loading"
            danger
            type="default"
            @click="handleDelete"
          >
            <DeleteOutlined />
            Delete
          </AButton>

          <AButton
            :disabled="roomsStore.loading"
            :loading="roomsStore.loading"
            form="room-form"
            html-type="submit"
            type="primary"
          >
            <PlusOutlined v-if="!isEditing" />
            {{ isEditing ? 'Save Changes' : 'Add Room' }}
          </AButton>
        </AFlex>
      </ACol>
    </ARow>
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
