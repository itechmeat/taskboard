<template>
  <component :is="tag" class="ui-field">
    <span v-if="label" class="ui-field__label">{{ label }}</span>
    <span class="ui-field__control">
      <slot />
    </span>
  </component>
</template>

<script>
export default {
  name: "UiField",

  props: {
    tag: {
      type: String,
      default: "label",
    },
    label: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss">
$block: ".ui-field";

#{$block} {
}
</style>
