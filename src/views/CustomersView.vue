<script setup>
import Header from '@/components/Header.vue'
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import CustomerCard from '@/components/CustomerCard.vue'
import Section from '@/components/Section.vue'
import customersStore from '@/stores/customersStore'
import { computed, onMounted, ref, watch } from 'vue'

const useCustomerStore = customersStore()

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 5

onMounted(async () => {
  await useCustomerStore.fetchCustomers()
})

const filteredCustomers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return useCustomerStore.customers
  }

  return useCustomerStore.customers.filter((customer) => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase()
    const phone = (customer.phone ?? '').toLowerCase()

    return fullName.includes(query) || phone.includes(query)
  })
})

const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / pageSize))

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * pageSize

  return filteredCustomers.value.slice(start, start + pageSize)
})

watch(searchQuery, () => {
  currentPage.value = 1
})

watch(totalPages, (pages) => {
  if (currentPage.value > pages) {
    currentPage.value = Math.max(1, pages)
  }
})

function changePage(page) {
  currentPage.value = page
}
</script>

<template>
  <Header>
    <template #title>Customers</template>
    <template #subtitle> {{ useCustomerStore.customers.length }} customer records </template>
    <template #actions>
      <AButton type="primary">
        <UserAddOutlined />
        New Customer
      </AButton>
    </template>
  </Header>

  <Section>
    <AFlex class="customer-lookup card" vertical>
      <AInput
        v-model:value="searchQuery"
        allow-clear
        class="search"
        placeholder="Search by name or phone number..."
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </AInput>

      <AFlex class="customer-list" vertical>
        <CustomerCard
          v-for="customer in paginatedCustomers"
          :key="customer.id"
          :customer="customer"
        />

        <div v-if="filteredCustomers.length === 0" class="empty-state">No customers found.</div>
      </AFlex>

      <APagination
        v-if="filteredCustomers.length > pageSize"
        :current="currentPage"
        :page-size="pageSize"
        :show-size-changer="false"
        :style="{ display: 'flex', justifyContent: 'end' }"
        :total="filteredCustomers.length"
        @change="changePage"
      />
    </AFlex>
  </Section>
</template>

<style scoped>
.customer-lookup {
  width: 40%;
  gap: 1rem;
}

.customer-list {
  gap: 0.5rem;
}

.empty-state {
  padding: 1.5rem;
  text-align: center;
  color: #888;
}

.search {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm);
  width: 100%;
  font: var(--body);
  color: var(--text-secondary);
}
</style>
