<script setup>
import Header from '@/components/Header.vue'
import Section from '@/components/Section.vue'
import CustomerDetails from '@/components/CustomerDetails.vue'
</script>
<template>
  <Header>
    <template #title>Add address</template>
    <template #subtitle>Add a new installation address for Emma Thompson.</template>
    <template #actions> </template>
  </Header>

  <Section>
    <AFlex>
      <CustomerDetails :customer="customer" />
    </AFlex>
  </Section>
</template>
