<script setup>
import { computed, onMounted, reactive } from 'vue'
import Button from '@/components/Button.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import Body from '@/components/Typography/Body.vue'
import brandsStore from '@/stores/brandsStore.js'
import categoriesStore from '@/stores/categoriesStore.js'
import Label from '@/components/Typography/Label.vue'

const useBrandsStore = brandsStore()
const useCategoriesStore = categoriesStore()

onMounted(() => {
  useBrandsStore.fetchBrands()
  useCategoriesStore.fetchCategories()
})

const emit = defineEmits(['close'])

const brandOptions = computed(() =>
  useBrandsStore.brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  })),
)

const categoryOptions = computed(() =>
  useCategoriesStore.categories.map((category) => ({
    label: category.name,
    value: category.id,
  })),
)

const form = reactive({
  brand: undefined,
  name: '',
  category: undefined,
  sellingPriceM2: '',
  costPriceM2: '',
  isActive: true,
})

function handleSubmit() {
  console.log('Product form:', form)
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
</script>

<template>
  <div class="form-container">
    <div class="form-header">
      <Body class="title">Add Product</Body>
      <Body class="subtitle"> Enter the product details below.</Body>
    </div>

    <AForm :model="form" layout="vertical" @finish="handleSubmit">
      <ARow :gutter="[16, 0]">
        <ACol :span="24">
          <AFormItem :rules="rules.brand" label="Brand" name="brand">
            <ASelect
              v-model:value="form.brand"
              :loading="useBrandsStore.loading"
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
              :loading="useCategoriesStore.loading"
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

      <AFlex class="button-section" vertical>
        <Button variant="primary" @click="handleSubmit">
          <PlusOutlined />
          Add Product
        </Button>
        <Button variant="danger" @click="handleCancel"> Cancel</Button>
      </AFlex>
    </AForm>
  </div>
</template>

<style scoped>
.switch-section {
  padding: var(--space-md);
  background-color: var(--bg);
  align-items: center;
  border-radius: 0.5rem;
}

.form-container {
  box-sizing: border-box;
  padding: 1.5rem;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  align-self: flex-start;
  width: 40%;
}

.form-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
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
