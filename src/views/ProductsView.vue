<script setup>
import Header from '@/components/Header.vue'
import ProductForm from '@/components/forms/ProductForm.vue'
import ProductsTable from '@/components/tables/ProductsTable.vue'
import Section from '@/components/Section.vue'
import useCategoriesStore from '@/stores/categoriesStore.js'

import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'
import useProductsStore from '@/stores/productsStore.js'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const searchQuery = ref('')
const selectedCategory = ref(undefined)
const productFormVisibility = ref(false)
const selectedProduct = ref(null)

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return productsStore.products.filter((product) => {
    const matchesName = product.name?.toLowerCase().includes(query)

    const categoryId =
      typeof product.category === 'object' ? product.category?.id : product.category

    const matchesCategory =
      selectedCategory.value === undefined || String(categoryId) === String(selectedCategory.value)

    return matchesName && matchesCategory
  })
})

const categoryOptions = computed(() =>
  categoriesStore.categories.map((category) => ({
    label: category.name,
    value: category.id,
  })),
)

onMounted(() => {
  productsStore.fetchProducts()
  categoriesStore.fetchCategories()
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
    <template #subtitle>{{ productsStore.products.length }} active - 14 inactive</template>
    <template #actions>
      <AButton type="primary" @click="openCreateForm()"><PlusOutlined />Add Product</AButton>
    </template>
  </Header>

  <Section>
    <AFlex class="products-container" vertical>
      <ARow class="filters" gutter="16">
        <ACol :span="18">
          <AInput
            v-model:value="searchQuery"
            allow-clear
            class="search"
            placeholder="Search products by name..."
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </AInput>
        </ACol>
        <ACol :span="6">
          <ASelect
            v-model:value="selectedCategory"
            :options="categoryOptions"
            allow-clear
            class="category"
            placeholder="All categories"
            style="width: 100%"
          />
        </ACol>
      </ARow>
      <ARow :gutter="16">
        <ACol :span="productFormVisibility ? 16 : 24">
          <ProductsTable :products="filteredProducts" @edit="openEditForm"
        /></ACol>
        <ACol v-if="productFormVisibility" :span="8">
          <ProductForm :product="selectedProduct" @close="closeForm" />
        </ACol>
      </ARow>
    </AFlex>
  </Section>
</template>

<style scoped>
.products-container {
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
