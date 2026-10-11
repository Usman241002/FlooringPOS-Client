<script setup>
import { reactive } from 'vue'
import Button from '@/components/Button.vue'

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
      <ATypographyTitle :level="4" class="title"> Add Product </ATypographyTitle>
      <ATypographyText class="subtitle"> Enter the product details below. </ATypographyText>
    </div>

    <AForm layout="vertical" @finish="handleSubmit">
      <ARow :gutter="[16, 0]">
        <ACol :sm="12" :xs="24">
          <AFormItem label="Brand" name="brand">
            <AInput v-model:value="form.brand" placeholder="Enter brand" />
          </AFormItem>
        </ACol>

        <ACol :sm="12" :xs="24">
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
                { label: 'Underlay', value: 'Underlay' },
                { label: 'Beading', value: 'Beading' },
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

      <div class="button-section">
        <Button variant="danger" @click="handleCancel"> Cancel </Button>
        <Button variant="primary" @click="handleSubmit"> Add Product </Button>
      </div>
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
}

.form-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
}

.title {
  margin: 0;
  color: var(--text-primary);
  font: var(--body);
  font-weight: 600;
}

.subtitle {
  color: var(--text-secondary);
  font: var(--body);
}

.button-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
