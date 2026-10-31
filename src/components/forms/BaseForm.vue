<script setup>
import Body from '@/components/typography/Body.vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { onMounted, onUnmounted } from 'vue'
import Paper from '@/components/Paper.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  submitLabel: {
    type: String,
    default: 'Save Changes',
  },
  showSubmit: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  model: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['submit', 'close'])

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    emit('close')
  }
}
</script>

<template>
  <Paper :style="{ width: props.width }">
    <template #header>
      <div class="form-header">
        <AFlex class="header-text" vertical>
          <Body class="title">
            {{ title }}
          </Body>

          <Body v-if="subtitle" class="subtitle">
            {{ subtitle }}
          </Body>
        </AFlex>

        <AButton v-if="showClose" aria-label="Close form" type="text" @click="emit('close')">
          <CloseOutlined />
        </AButton>
      </div>
    </template>

    <AForm :model="model" layout="vertical" @finish="emit('submit')">
      <slot />

      <AFlex class="button-section" justify="end">
        <!-- Additional actions, such as Delete -->
        <slot name="actions" />

        <AButton
          v-if="showSubmit"
          :disabled="loading"
          :loading="loading"
          html-type="submit"
          type="primary"
        >
          <slot name="submit-icon" />
          {{ submitLabel }}
        </AButton>
      </AFlex>
    </AForm>
  </Paper>
</template>

<style scoped>
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
}

.header-text {
  gap: 0.25rem;
  min-width: 0;
}

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
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  width: 100%;
}
</style>
