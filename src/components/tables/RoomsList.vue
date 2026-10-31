<script setup>
import Body from '@/components/typography/Body.vue'
import RoomCard from '@/components/cards/RoomCard.vue'
import useRoomsStore from '@/stores/roomsStore.js'
import Paper from '@/components/Paper.vue'

const { rooms } = defineProps({
  rooms: {
    type: Array,
    required: true,
  },
})

const roomsStore = useRoomsStore()
const emit = defineEmits(['edit'])

function handleClick(room) {
  roomsStore.room = room
  emit('edit', room)
}
</script>

<template>
  <Paper>
    <template #header>
      <AFlex vertical>
        <Body class="title"> Rooms </Body>

        <Body class="subtitle"
          >{{ rooms.filter((room) => room.lengthM && room.widthM).length }} measured •
          {{ rooms.filter((room) => !(room.lengthM && room.widthM)).length }} incomplete
        </Body>
      </AFlex>
    </template>
    <AFlex class="rooms-list" vertical>
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :active="room.id === roomsStore.room?.id"
        :room="room"
        @click="handleClick(room)"
      />
    </AFlex>
  </Paper>
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
