<template>
  <header class="header">TaskBoard</header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".header";

#{$block} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 var(--gap);
  background: var(--color-primary);
  box-shadow: 0 4px 16px rgba($colorShadow, 0.2);
  color: var(--color-light);
  font-size: var(--font-size-legend);
  font-weight: 500;
}
</style>
