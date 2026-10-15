<script setup>
import Card from '@/components/Card.vue'
import Label from '@/components/Typography/Label.vue'
import Body from '@/components/Typography/Body.vue'

const { customer } = defineProps({
  customer: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <Card>
    <AFlex vertical>
      <AFlex>
        <AAvatar :class="['avatar', active ? 'active-avatar' : '']">
          {{ customer.firstName?.[0] }}{{ customer.lastName?.[0] }}
        </AAvatar>

        <AFlex class="customer-details" vertical>
          <Body class="customer-name"> {{ customer.firstName }} {{ customer.lastName }} </Body>
          <Label>{{ customer.phone }}</Label>
        </AFlex>
      </AFlex>
    </AFlex>
  </Card>
</template>
