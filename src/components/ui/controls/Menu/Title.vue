<template>
  <div class="ui-menu-title">
    <slot />
  </div>
</template>

<script>
export default {
  name: "UiMenuTitle",
};
</script>

<style lang="scss" scoped>
$block: ".ui-menu-title";

#{$block} {
  margin: 0 0 var(--gap-0-5);
  padding: 0 var(--gap);
  font-size: var(--font-size-base);
  font-weight: 600;
  text-align: right;
  white-space: nowrap;

  &:not(:first-child) {
    margin-top: var(--gap-0-5);
    padding-top: var(--gap-0-5);
    border-top: 1px solid var(--color-border);
  }
}
</style>
