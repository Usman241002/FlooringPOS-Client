<script setup>
import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue'
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'
import ProductsTable from '@/components/ProductsTable.vue'
import Section from '@/components/Section.vue'
import { computed, onMounted, ref } from 'vue'
import AddProductForm from '@/components/AddProductForm.vue'

import productsStore from '@/stores/productsStore.js'
import categoriesStore from '@/stores/categoriesStore.js'

const useProductsStore = productsStore()
const useCategoriesStore = categoriesStore()

const searchInput = ref('')
const selectedCategory = ref(undefined)
const productFormVisibility = ref(false)

const filteredProducts = computed(() => {
  const query = searchInput.value.trim().toLowerCase()

  return useProductsStore.products.filter((product) => {
    const matchesName = product.name?.toLowerCase().includes(query)

    const categoryId =
      typeof product.category === 'object' ? product.category?.id : product.category

    const matchesCategory =
      selectedCategory.value === undefined || String(categoryId) === String(selectedCategory.value)

    return matchesName && matchesCategory
  })
})

const categoryOptions = computed(() =>
  useCategoriesStore.categories.map((category) => ({
    label: category.name,
    value: category.id,
  })),
)

onMounted(() => {
  useProductsStore.fetchProducts()
  useCategoriesStore.fetchCategories()
})
</script>
<template>
  <Header>
    <template #title>Products</template>
    <template #subtitle>{{ useProductsStore.products.length }} active - 14 inactive</template>
    <template #actions>
      <Button @click="() => (productFormVisibility = true)"><PlusOutlined />Add Product</Button>
    </template>
  </Header>

  <Section>
    <AFlex class="products-container" vertical>
      <AFlex class="filters">
        <AInput
          v-model:value="searchInput"
          allow-clear
          class="search"
          placeholder="Search products by name..."
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </AInput>

        <ASelect
          v-model:value="selectedCategory"
          :options="categoryOptions"
          allow-clear
          class="category"
          placeholder="All categories"
          style="width: 15rem"
        />
      </AFlex>
      <AFlex class="content">
        <ProductsTable :products="filteredProducts" />

        <AddProductForm v-if="productFormVisibility" @close="productFormVisibility = false" />
      </AFlex>
    </AFlex>
  </Section>
</template>

<style scoped>
.products-container {
  gap: var(--space-lg);
}

.content,
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
