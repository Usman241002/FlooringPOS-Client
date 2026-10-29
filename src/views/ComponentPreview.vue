<script setup>
import AddressCard from '@/components/cards/AddressCard.vue'
import RoomCard from '@/components/cards/RoomCard.vue'
import CustomerCard from '@/components/cards/CustomerCard.vue'
import Tag from '@/components/Tag.vue'
import AddressForm from '@/components/forms/AddressForm.vue'
import ProductForm from '@/components/forms/ProductForm.vue'
import CustomerForm from '@/components/forms/CustomerForm.vue'
import RoomForm from '@/components/forms/RoomForm.vue'

const customer = {
  firstName: 'Usman',
  lastName: 'Khalid',
  phone: '07777777777',
  addresses: [
    {
      line1: '22 Fakemoor Road',
      line2: 'Burnley',
      postcode: 'B12 1AA',
      rooms: [
        {
          name: 'Living Room',
          length: 10,
          width: 10,
        },
      ],
    },
  ],
}
</script>

<template>
  <AFlex :style="{ padding: '1rem' }" gap="16" vertical>
    <ATypographyTitle :level="3">Cards</ATypographyTitle>

    <ARow :gutter="[16, 16]">
      <ACol :span="8"> <CustomerCard :active="true" :customer="customer" /></ACol
      ><ACol :span="8"><CustomerCard :customer="customer" /> </ACol>
    </ARow>

    <ARow :gutter="[16, 16]">
      <ACol :span="8"> <AddressCard :address="customer.addresses[0]" /></ACol>
    </ARow>

    <ARow :gutter="[16, 16]">
      <ACol :span="8"> <RoomCard :active="true" :room="customer.addresses[0].rooms[0]" /> </ACol
      ><ACol :span="8"> <RoomCard :room="{ name: 'Living Room', length: 10, width: 10 }" /> </ACol
      ><ACol :span="8"> <RoomCard :room="{ name: 'Living Room', length: 10 }" /> </ACol>
    </ARow>

    <ATypographyTitle :level="3">Forms</ATypographyTitle>

    <ARow :gutter="[16, 16]">
      <ACol :span="12"><CustomerForm /></ACol>
      <ACol :span="12"><AddressForm /></ACol>
      <ACol :span="12"><RoomForm /></ACol>
      <ACol :span="12"><ProductForm /></ACol>
    </ARow>

    <ATypographyTitle :level="3">Tags</ATypographyTitle>

    <AFlex gap="8">
      <Tag class="primary">Quote sent</Tag>
      <Tag class="success">Paid</Tag>
      <Tag class="danger">Draft</Tag>
      <Tag class="warning">Overdue</Tag>
      <Tag class="inactive">Inactive</Tag>
    </AFlex>
  </AFlex>
</template>

<style scoped></style>
