<script setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'
import ProductsTable from '@/components/ProductsTable.vue'
import Section from '@/components/Section.vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, onMounted, computed } from 'vue'
import API_URL from '@/services/api.js'

const products = ref([])
const loading = ref(false)
const error = ref(null)
const searchInput = ref('')

const selectedCategory = ref(undefined)

const categories = computed(() => {
  return [
    ...new Map(
      products.value
        .map((product) => product.category)
        .filter(Boolean)
        .map((category) => [
          typeof category === 'object' ? category.id : category,
          typeof category === 'object' ? category.name : category,
        ]),
    ).entries(),
  ].map(([value, label]) => ({ value, label }))
})

const filteredProducts = computed(() => {
  const query = searchInput.value.trim().toLowerCase()

  return products.value.filter((product) => {
    const matchesName = product.name?.toLowerCase().includes(query)

    const categoryId =
      typeof product.category === 'object' ? product.category?.id : product.category

    const matchesCategory =
      selectedCategory.value === undefined || String(categoryId) === String(selectedCategory.value)

    return matchesName && matchesCategory
  })
})

async function fetchProducts() {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`${API_URL}/api/v1/products`)

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    products.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch products:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)
</script>
<template>
  <Header>
    <template #title>Products</template>
    <template #subtitle>{{ products.length }} active - 14 inactive</template>
    <template #actions>
      <Button><PlusOutlined />Add Product</Button>
    </template>
  </Header>

  <Section>
    <AFlex class="products-container" vertical>
      <AFlex class="filters">
        <AInput
          class="search"
          v-model:value="searchInput"
          placeholder="Search products by name..."
          allow-clear
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </AInput>

        <ASelect
          class="category"
          v-model:value="selectedCategory"
          :options="categories"
          placeholder="All categories"
          allow-clear
          style="width: 15rem"
        />
      </AFlex>
      <ProductsTable :products="filteredProducts" />
    </AFlex>
  </Section>
</template>

<style scoped>
.products-container {
  gap: var(--space-lg);
}

.filters {
  gap: var(--space-lg);
}

.category {
  font: var(--body);
  color: var(--text-secondary);
}

.category :deep(.ant-select-selector) {
  min-height: 100%;
  padding: var(--space-md);
  display: flex;
  align-items: center;
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
