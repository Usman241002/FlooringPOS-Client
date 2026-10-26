<script setup>
import Tag from '@/components/Tag.vue'
import Body from '@/components/typography/Body.vue'
import Heading from '@/components/typography/Heading.vue'

const { room, active } = defineProps({
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
</script>

<template>
  <div :class="['card', 'room-card', { active }]" @click="emit('click')">
    <AFlex class="text-container" justify="space-between" vertical>
      <Body class="name"> {{ room.name }} </Body>
      <Heading class="measurement"> {{ room.areaM2 }}m<sup>2</sup> </Heading>
    </AFlex>
    <AFlex vertical>
      <Tag :variant="room.width && room.length ? 'success' : 'warning'">
        {{ room.width && room.length ? 'Measured' : 'Incomplete' }}
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

.active {
  border: 2px solid var(--primary);
}
</style>
