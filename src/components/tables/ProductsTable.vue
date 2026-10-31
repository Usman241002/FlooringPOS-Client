<script setup>
import Tag from '@/components/Tag.vue'
import useProductsStore from '@/stores/productsStore.js'
import { ref } from 'vue'

const { products } = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
})

const productStore = useProductsStore()

const emit = defineEmits(['edit'])

const pagination = ref({
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50'],
})

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Brand', dataIndex: 'brand', key: 'brand' },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'Status', dataIndex: 'isActive', key: 'isActive' },
  { title: 'Actions', key: 'actions' },
]

function handleRowClick(record) {
  emit('edit', record)
}
</script>

<template>
  <div class="table-container">
    <ATable
      :columns="columns"
      :custom-row="
        (record) => ({
          onClick: () => handleRowClick(record),
        })
      "
      :data-source="products"
      :loading="productStore.loading"
      :locale="{ emptyText: 'No products found.' }"
      :pagination="pagination"
      row-key="id"
      @change="
        (pag) => {
          pagination.current = pag.current
          pagination.pageSize = pag.pageSize
        }
      "
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'brand' || column.key === 'category'">
          {{ record[column.key]?.name ?? record[column.key] ?? '—' }}
        </template>

        <template v-else-if="column.key === 'isActive'">
          <Tag v-if="record.isActive" variant="success">Active</Tag>
          <Tag v-else variant="inactive">Inactive</Tag>
        </template>

        
      </template>
    </ATable>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  overflow: hidden;
  background: var(--surface);
}

.table-container :deep(.ant-table-thead > tr > th) {
  font: var(--label);
  color: var(--text-secondary);
  text-transform: uppercase;
  white-space: nowrap;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.table-container :deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid var(--border);
}

.table-container :deep(.ant-table-tbody > tr:last-child > td) {
  border-bottom: none;
}

.table-container :deep(.ant-table-tbody > tr > td) {
  font: var(--body);
  cursor: pointer;
}

.table-container :deep(.ant-table-tbody > tr:hover > td) {
  background: var(--bg);
}

.table-container :deep(.ant-table-pagination) {
  margin: var(--space-lg);
}
</style>
