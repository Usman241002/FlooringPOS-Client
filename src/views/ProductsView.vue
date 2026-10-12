<script setup>
import Header from '@/components/Header.vue'
import ProductForm from '@/components/ProductForm.vue'
import ProductsTable from '@/components/ProductsTable.vue'
import Section from '@/components/Section.vue'
import categoriesStore from '@/stores/categoriesStore.js'

import productsStore from '@/stores/productsStore.js'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'

const useProductsStore = productsStore()
const useCategoriesStore = categoriesStore()

const searchInput = ref('')
const selectedCategory = ref(undefined)
const productFormVisibility = ref(false)
const selectedProduct = ref(null)

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

function openEditForm(product) {
  selectedProduct.value = product
  productFormVisibility.value = true
}

function openCreateForm() {
  selectedProduct.value = null
  productFormVisibility.value = true
}

function closeForm() {
  productFormVisibility.value = false
  selectedProduct.value = null
}
</script>
<template>
  <Header>
    <template #title>Products</template>
    <template #subtitle>{{ useProductsStore.products.length }} active - 14 inactive</template>
    <template #actions>
      <AButton type="primary" @click="openCreateForm()"><PlusOutlined />Add Product</AButton>
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
        <ProductsTable :products="filteredProducts" @edit="openEditForm" />

        <ProductForm v-if="productFormVisibility" :product="selectedProduct" @close="closeForm" />
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
