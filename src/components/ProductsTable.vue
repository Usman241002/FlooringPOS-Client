<script setup>
import { ref } from 'vue'
import Tag from '@/components/Tag.vue'

const { products } = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

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
  {
    title: 'Sell/M²',
    dataIndex: 'sellingPriceM2',
    key: 'sellingPriceM2',
  },
  {
    title: 'Cost/M²',
    dataIndex: 'costPriceM2',
    key: 'costPriceM2',
    customCell: () => ({ class: 'costPrice' }),
  },
  { title: 'Margin', dataIndex: 'margin', key: 'margin' },
  {title: "Status", dataIndex: "isActive", key: "isActive"},
]

function calculateMargin(record) {
  const sellingPrice = Number(record.sellingPriceM2)
  const costPrice = Number(record.costPriceM2)

  if (
    record.sellingPriceM2 == null ||
    record.costPriceM2 == null ||
    !Number.isFinite(sellingPrice) ||
    !Number.isFinite(costPrice) ||
    sellingPrice <= 0
  ) {
    return null
  }

  return ((sellingPrice - costPrice) / sellingPrice) * 100
}
</script>

<template>
  <div class="table-container">
    <a-alert v-if="error" type="error" :message="`Failed to load products: ${error}`" show-icon />

    <a-table
      v-else
      :columns="columns"
      :data-source="products"
      :loading="loading"
      :pagination="pagination"
      @change="
        (pag) => {
          pagination.current = pag.current
          pagination.pageSize = pag.pageSize
        }
      "
      row-key="id"
      :locale="{ emptyText: 'No products found.' }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'brand' || column.key === 'category'">
          {{ record[column.key]?.name ?? record[column.key] ?? '—' }}
        </template>

        <template v-else-if="column.key === 'sellingPriceM2'">
          {{ record[column.key] != null ? `£${Number(record[column.key]).toFixed(2)}` : '—' }}
        </template>

        <template v-else-if="column.key === 'costPriceM2'" class="costPrice">
          {{ record[column.key] != null ? `£${Number(record[column.key]).toFixed(2)}` : '—' }}
        </template>

        <template v-else-if="column.key === 'margin'">
          <span
            :class="{
              'margin-positive': calculateMargin(record) > 0,
              'margin-negative': calculateMargin(record) < 0,
            }"
          >
            {{ calculateMargin(record) !== null ? `${calculateMargin(record).toFixed(1)}%` : '—' }}
          </span>
        </template>

        <template v-else-if="column.key === 'isActive'">

          <Tag v-if="record.isActive" variant="success">Active</Tag>
          <Tag v-else variant="inactive">Inactive</Tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.table-container :deep(.costPrice) {
  color: var(--text-secondary);
}

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
}

.table-container :deep(.ant-table-tbody > tr:hover > td) {
  background: var(--bg);
}

.margin-positive {
  color: var(--success);
}

.margin-negative {
  color: var(--danger);
}
.table-container :deep(.ant-table-pagination) {
  margin: var(--space-lg);
}
</style>
