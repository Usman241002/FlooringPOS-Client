<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/typography/Body.vue'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import useAddressesStore from '@/stores/addressesStore.js'
import useRoomsStore from '@/stores/roomsStore.js'

const emit = defineEmits(['close'])
const addressesStore = useAddressesStore()
const roomsStore = useRoomsStore()

const form = reactive({
  name: '',
  length: null,
  width: null,
})

const rules = {
  name: [{ required: true, message: 'Please enter a room name' }],
  length: [{ required: true, type: 'number', min: 0.01, message: 'Enter a length greater than 0' }],
  width: [{ required: true, type: 'number', min: 0.01, message: 'Enter a width greater than 0' }],
}

const isEditing = computed(() => !!roomsStore.room?.id)

const area = computed(() => {
  if (!form.length || !form.width) return null
  return (form.length * form.width).toFixed(2)
})

const addressLabel = computed(() => {
  const a = addressesStore.address
  return a ? [a.line1, a.city, a.postcode].filter(Boolean).join(', ') : 'No address selected'
})

watch(
  () => roomsStore.room,
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
    if (isEditing.value) {
      await roomsStore.updateRoom(roomsStore.room.id, form)
      message.success('Room updated successfully')
    } else {
      await roomsStore.createRoom(addressesStore.address.id, form)
      message.success('Room added successfully')
    }

    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to save room')
  }
}

async function handleDelete(id) {
  try {
    await roomsStore.deleteRoom(id)
    message.success('Room deleted successfully')
    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to delete room')
  }
}

function handleCancel() {
  Object.assign(form, {
    name: '',
    length: null,
    width: null,
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
        <Body class="title">{{ form.name || (isEditing ? 'Edit room' : 'New room') }}</Body>
        <Body class="subtitle">{{ addressLabel }}</Body>
      </AFlex>
      <AButton type="text" @click="handleCancel">
        <CloseOutlined />
      </AButton>
    </template>

    <ARow>
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
            <ACol :span="12">
              <AFormItem label="Length" name="length">
                <AInputNumber
                  v-model:value="form.length"
                  :min="0"
                  :precision="2"
                  :step="0.01"
                  placeholder="0.00"
                  style="width: 100%"
                >
                  <template #addonAfter>m</template>
                </AInputNumber>
              </AFormItem>
            </ACol>
            <ACol :span="12">
              <AFormItem label="Width" name="width">
                <AInputNumber
                  v-model:value="form.width"
                  :min="0"
                  :precision="2"
                  :step="0.01"
                  placeholder="0.00"
                  style="width: 100%"
                >
                  <template #addonAfter>m</template>
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
            <div class="room-square-dims">{{ form.width }} m × {{ form.length }} m</div>
          </template>
          <div v-else class="room-square-dims">Enter width and length</div>
        </div>
      </ACol>
      <AFlex class="button-section">
        <AButton
          v-if="isEditing"
          :disabled="roomsStore.loading"
          :loading="roomsStore.loading"
          danger
          type="default"
          @click="handleDelete(roomsStore.room.id)"
        >
          <DeleteOutlined /> Delete
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
