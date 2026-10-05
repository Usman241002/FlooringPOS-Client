<script setup></script>

<template>
  <AFlex align="center" class="header-container" justify="space-between">
    <AFlex vertical>
      <div class="heading">
        <slot name="title" />
      </div>

      <p class="body">
        <slot name="subtitle" />
      </p>
    </AFlex>

    <AFlex gap="var(--space-md)">
      <slot name="actions" />
    </AFlex>
  </AFlex>
</template>

<style scoped>
.header-container {
  padding: var(--space-lg) var(--space-xl);
  background-color: var(--surface);
}

.heading {
  font-size: 1.25rem;
}
</style>
