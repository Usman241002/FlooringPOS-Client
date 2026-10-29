<script setup>
import Body from '@/components/typography/Body.vue'
import Label from '@/components/typography/Label.vue'
import { message } from 'ant-design-vue'
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import useProductsStore from '@/stores/productsStore.js'
import useBrandsStore from '@/stores/brandsStore.js'
import useCategoriesStore from '@/stores/categoriesStore.js'
import BaseForm from '@/components/forms/BaseForm.vue'

const { product } = defineProps({
  product: {
    type: Object,
    default: null,
  },
})

const productsStore = useProductsStore()
const brandsStore = useBrandsStore()
const categoriesStore = useCategoriesStore()

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
  <BaseForm
    :loading="productsStore.loading"
    :submit-label="product ? 'Save Changes' : 'Add Product'"
    :subtitle="product ? 'Edit an existing product' : 'Add a new product'"
    :title="product ? 'Edit Product' : 'Add Product'"
    model="form"
    @close="handleCancel"
    @submit="handleSubmit"
  >
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
  </BaseForm>
</template>

<style scoped>
.switch-section {
  padding: var(--space-md);
  background-color: var(--bg);
  align-items: center;
  border-radius: 0.5rem;
}
</style>
