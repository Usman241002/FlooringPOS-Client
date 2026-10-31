<script setup></script>

<template>
  <AFlex class="card" vertical>
    <AFlex class="body" vertical>
      <slot />
    </AFlex>
  </AFlex>
</template>

<style scoped>
.card {
  height: fit-content;
  align-self: flex-start;
  gap: 1rem;
}
</style>
