<template>
  <component
    :is="tag"
    :to="to ? to : undefined"
    :href="href ? href : undefined"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    class="ui-menu-item"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "UiMenuItem",

  props: {
    to: {
      type: String,
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    tag() {
      if (this.to) {
        return "router-link";
      }

      if (this.href) {
        return "a";
      }

      return "button";
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".ui-menu-item";

#{$block} {
  @extend %resetButton;
  display: block;
  width: 100%;
  padding: var(--gap-0-5) var(--gap);
  color: var(--color-text);
  text-align: right;
  white-space: nowrap;
  user-select: none;
  outline: none;

  &:hover {
    background: var(--color-bg-accent);
    color: var(--color-text);
  }
}
</style>
