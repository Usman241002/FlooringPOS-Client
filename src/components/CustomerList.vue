<script setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { computed, ref, watch } from 'vue'
import CustomerCard from '@/components/CustomerCard.vue'
import customersStore from '@/stores/customersStore.js'

const { customers } = defineProps({
  customers: {
    type: Array,
    default: () => [],
  },
})

const useCustomersStore = customersStore()

const emit = defineEmits(['edit'])

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 5

const filteredCustomers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return customers
  }

  return customers.filter((customer) => {
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

function editCustomer(customer) {
  emit('edit', customer)
}
</script>
<template>
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
        :active="customer.id === useCustomersStore.customer?.id"
        :customer="customer"
        @click="editCustomer(customer)"
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
</template>

<style scoped>
.customer-lookup {
  min-width: 50%;
  gap: var(--space-lg);
  height: fit-content;
  align-self: flex-start;
}

.customer-list {
  gap: var(--space-sm);
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
