<template>
  <div class="ui-container" :class="size ? `ui-container_${size}` : undefined">
    <slot />
  </div>
</template>

<script>
export default {
  name: "UiContainer",

  props: {
    size: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss">
$block: ".ui-container";

#{$block} {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--gap);

  &_medium {
    max-width: 960px;
  }
}
</style>
