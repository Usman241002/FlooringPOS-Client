<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/typography/Body.vue'
import RoomCard from '@/components/cards/RoomCard.vue'

const { rooms } = defineProps({
  rooms: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <Card class="card">
    <template #header>
      <AFlex vertical>
        <Body class="title"> Rooms </Body>

        <Body class="subtitle"
          >{{ rooms.filter((room) => room.length && room.width).length }} measured •
          {{ rooms.filter((room) => !(room.length && room.width)).length }} incomplete
        </Body>
      </AFlex>
    </template>
    <AFlex class="rooms-list" vertical>
      <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
    </AFlex>
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

.rooms-list {
  gap: var(--space-sm);
}
</style>
