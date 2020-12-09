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
  display: flex;
  flex-wrap: wrap;

  &__label {
    flex: 0 0 auto;
    margin: 0 0 var(--gap-0-5);
    font-weight: 500;
  }

  &__control {
    flex: 0 0 100%;
  }
}
</style>
