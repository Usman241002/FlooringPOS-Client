<script setup>
import Tag from '@/components/Tag.vue'
import Body from '@/components/typography/Body.vue'
import Heading from '@/components/typography/Heading.vue'

const { room } = defineProps({
  room: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <AFlex class="card" justify="space-between">
    <AFlex class="text-container" justify="space-between" vertical>
      <Body class="name"> {{ room.name }} </Body>
      <Heading class="measurement"> {{ room.areaM2 }}m<sup>2</sup> </Heading>
    </AFlex>
    <AFlex vertical>
      <Tag :variant="room.width && room.length ? 'success' : 'warning'">
        {{ room.width && room.length ? 'Measured' : 'Incomplete' }}
      </Tag>
    </AFlex>
  </AFlex>
</template>

<style scoped>
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
</style>
