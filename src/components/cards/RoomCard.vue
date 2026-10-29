```vue
<script setup>
import Tag from '@/components/Tag.vue'
import Body from '@/components/typography/Body.vue'
import Heading from '@/components/typography/Heading.vue'

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const isMeasured = () => Number(props.room.length) > 0 && Number(props.room.width) > 0

const area = () => {
  if (!isMeasured()) return null

  return Number(props.room.length) * Number(props.room.width)
}
</script>

<template>
  <div :class="['card', 'room-card', { 'active-card': active }]" @click="emit('click')">
    <AFlex class="text-container" justify="space-between" vertical>
      <Body class="name">{{ room.name }}</Body>

      <Heading class="measurement">
        <template v-if="area() !== null"> {{ area().toFixed(2) }} m<sup>2</sup> </template>
        <template v-else> N/A </template>
      </Heading>
    </AFlex>

    <AFlex vertical>
      <Tag :variant="isMeasured() ? 'success' : 'warning'">
        {{ isMeasured() ? 'Measured' : 'Incomplete' }}
      </Tag>
    </AFlex>
  </div>
</template>

<style scoped>
.room-card {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.text-container {
  gap: 0.25rem;
}

.name {
  color: var(--text-primary);
  font: var(--body);
}

.measurement {
  color: var(--primary);
  font-size: 1.5rem;
}

.measurement sup {
  font-size: 0.6em;
  vertical-align: super;
}
</style>
```
