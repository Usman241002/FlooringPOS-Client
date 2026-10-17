<script setup>
import Body from '@/components/typography/Body.vue'
import Label from '@/components/typography/Label.vue'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import Card from '@/components/Card.vue'
import useProductsStore from '@/stores/productsStore.js'
import useBrandsStore from '@/stores/brandsStore.js'

const { product } = defineProps({
  product: {
    type: Object,
    default: null,
  },
})

const productsStore = useProductsStore()
const brandsStore = useBrandsStore()
const categoriesStore = categoriesStore()

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
  brandsStore.fetchBrands()
  categoriesStore.fetchCategories()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

const form = reactive({
  brand: undefined,
  name: '',
  category: undefined,
  sellingPriceM2: '',
  costPriceM2: '',
  isActive: true,
})

watch(
  () => product,
  (product) => {
    Object.assign(form, {
      brand: product?.brand?.id ?? product?.brand ?? undefined,
      name: product?.name ?? '',
      category: product?.category?.id ?? product?.category ?? undefined,
      sellingPriceM2: product?.sellingPriceM2 ?? '',
      costPriceM2: product?.costPriceM2 ?? '',
      isActive: product?.isActive ?? true,
    })
  },
  { immediate: true },
)

const brandOptions = computed(() =>
  brandsStore.brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  })),
)

const categoryOptions = computed(() =>
  categoriesStore.categories.map((category) => ({
    label: category.name,
    value: category.id,
  })),
)

async function handleSubmit() {
  try {
    if (product?.id) {
      await productsStore.updateProduct(product.id, form)
      message.success('Product updated successfully')
    } else {
      await productsStore.createProduct(form)
      message.success('Product added successfully')
    }

    emit('close')
  } catch (err) {
    message.error(err.message || 'Failed to save product')
  }
}

function handleCancel() {
  Object.assign(form, {
    brand: undefined,
    name: '',
    category: undefined,
    sellingPriceM2: '',
    costPriceM2: '',
    isActive: true,
  })

  emit('close')
}

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    handleCancel()
  }
}

async function handleDelete(id) {
  await productsStore.deleteProduct(id)
  message.success('Product deleted successfully')
  Object.assign(form, {
    brand: undefined,
    name: '',
    category: undefined,
    sellingPriceM2: '',
    costPriceM2: '',
    isActive: true,
  })
  emit('close')
}

const rules = {
  brand: [{ required: true, message: 'Please select a brand' }],
  category: [{ required: true, message: 'Please select a category' }],
  name: [
    {
      required: true,
      whitespace: true,
      message: 'Please enter a product name',
    },
  ],
  sellingPriceM2: [{ required: true, message: 'Enter a selling price' }],
  costPriceM2: [{ required: true, message: 'Enter a cost price' }],
}

const emit = defineEmits(['close'])
</script>

<template>
  <Card :style="{ width: '100%' }">
    <template #header>
      <AFlex class="form-texts" vertical>
        <Body class="title">
          {{ product ? 'Edit Product' : 'Add Product' }}
        </Body>

        <Body class="subtitle">
          {{
            product ? `${product.brand.name} ${product.name}` : 'Enter the product details below.'
          }}
        </Body>
      </AFlex>
      <AButton type="text" @click="handleCancel">
        <CloseOutlined />
      </AButton>
    </template>
    <AForm :model="form" layout="vertical" @finish="handleSubmit" @keydown.esc="handleCancel">
      <ARow :gutter="[16, 0]">
        <ACol :span="24">
          <AFormItem :rules="rules.brand" label="Brand" name="brand">
            <ASelect
              v-model:value="form.brand"
              :loading="brandsStore.loading"
              :options="brandOptions"
              allow-clear
              option-filter-prop="label"
              placeholder="Select brand"
              show-search
            />
          </AFormItem>
        </ACol>
        <ACol :span="24">
          <AFormItem :rules="rules.category" label="Category" name="category">
            <ASelect
              v-model:value="form.category"
              :loading="categoriesStore.loading"
              :options="categoryOptions"
              allow-clear
              option-filter-prop="label"
              placeholder="Select category"
              show-search
            />
          </AFormItem>
        </ACol>

        <ACol :span="24">
          <AFormItem :rules="rules.name" label="Product name" name="name">
            <AInput v-model:value="form.name" placeholder="Enter product name" />
          </AFormItem>
        </ACol>

        <ACol :sm="12" :xs="24">
          <AFormItem :rules="rules.sellingPriceM2" label="Selling price / m²" name="sellingPriceM2">
            <AInput
              v-model:value="form.sellingPriceM2"
              min="0"
              placeholder="0.00"
              step="0.01"
              type="number"
            >
              <template #prefix>£</template>
            </AInput>
          </AFormItem>
        </ACol>

        <ACol :sm="12" :xs="24">
          <AFormItem :rules="rules.costPriceM2" label="Cost price / m²" name="costPriceM2">
            <AInput
              v-model:value="form.costPriceM2"
              min="0"
              placeholder="0.00"
              step="0.01"
              type="number"
            >
              <template #prefix>£</template>
            </AInput>
          </AFormItem>
        </ACol>

        <ACol :span="24">
          <AFlex class="switch-section" justify="space-between">
            <AFlex vertical>
              <Body> Product Active</Body>
              <Label>Available in the POS catalogue</Label>
            </AFlex>

            <ASwitch v-model:checked="form.isActive" />
          </AFlex>
        </ACol>
      </ARow>

      <AFlex class="button-section">
        <AButton
          v-if="product"
          :disabled="productsStore.loading"
          :loading="productsStore.loading"
          danger
          type="default"
          @click="handleDelete(product.id)"
          ><DeleteOutlined /> Delete</AButton
        >
        <AButton
          :disabled="productsStore.loading"
          :loading="productsStore.loading"
          html-type="submit"
          type="primary"
        >
          <PlusOutlined v-if="!product" />
          {{ product ? 'Save Changes' : 'Add Product' }}
        </AButton>
      </AFlex>
    </AForm>
  </Card>
</template>

<style scoped>
.switch-section {
  padding: var(--space-md);
  background-color: var(--bg);
  align-items: center;
  border-radius: 0.5rem;
}

.title {
  color: var(--text-primary);
  font: var(--body);
  font-weight: bold;
}

.subtitle {
  color: var(--text-secondary);
  font: var(--body);
}

.button-section {
  display: flex;

  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
