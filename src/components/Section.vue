<template>
  <AFlex class="section-container">
    <slot/>
  </AFlex>
</template>

<style scoped>
.section-container {
  padding: var(--space-xl);
  width: 100%;
  height: auto;
  flex-direction: column;
}

</style>
