<script setup>
import { computed, onMounted, reactive } from 'vue'
import Button from '@/components/Button.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import Body from '@/components/Typography/Body.vue'
import brandsStore from '@/stores/brandsStore.js'

const useBrandsStore = brandsStore()

onMounted(() => useBrandsStore.fetchBrands())

const brandOptions = computed(() =>
  useBrandsStore.brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  })),
)

const form = reactive({
  brand: undefined,
  name: '',
  category: undefined,
  sellingPriceM2: '',
  costPriceM2: '',
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
  })
}
</script>

<template>
  <div class="form-container">
    <div class="form-header">
      <Body class="title">Add Product</Body>
      <Body class="subtitle"> Enter the product details below. </Body>
    </div>

    <AForm layout="vertical" @finish="handleSubmit">
      <ARow :gutter="[16, 0]">
        <ACol :span="24">
          <AFormItem
            :rules="[{ required: true, message: 'Please select a brand' }]"
            label="Brand"
            name="brand"
          >
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
          <AFormItem
            :rules="[{ required: true, message: 'Please select a category' }]"
            label="Category"
            name="category"
          >
            <ASelect
              v-model:value="form.category"
              :options="[
                { label: 'Carpet', value: 'Carpet' },
                { label: 'Laminate', value: 'Laminate' },
                { label: 'Lino', value: 'Lino' },
              ]"
              placeholder="Select category"
            />
          </AFormItem>
        </ACol>

        <ACol :span="24">
          <AFormItem
            :rules="[{ required: true, whitespace: true, message: 'Please enter a product name' }]"
            label="Product name"
            name="name"
          >
            <AInput v-model:value="form.name" placeholder="Enter product name" />
          </AFormItem>
        </ACol>

        <ACol :sm="12" :xs="24">
          <AFormItem
            :rules="[{ required: true, message: 'Enter a selling price' }]"
            label="Selling price / m² (£)"
            name="sellingPriceM2"
          >
            <AInput
              v-model:value="form.sellingPriceM2"
              min="0"
              placeholder="0.00"
              step="0.01"
              type="number"
            />
          </AFormItem>
        </ACol>

        <ACol :sm="12" :xs="24">
          <AFormItem label="Cost price / m² (£)" name="costPriceM2">
            <AInput
              v-model:value="form.costPriceM2"
              min="0"
              placeholder="0.00"
              step="0.01"
              type="number"
            />
          </AFormItem>
        </ACol>
      </ARow>

      <AFlex class="button-section" vertical>
        <Button variant="primary" @click="handleSubmit"><PlusOutlined /> Add Product </Button>
        <Button variant="danger" @click="handleCancel"> Cancel </Button>
      </AFlex>
    </AForm>
  </div>
</template>

<style scoped>
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
