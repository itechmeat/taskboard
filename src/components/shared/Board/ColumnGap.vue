<template>
  <div :class="classes">
    <div class="column-gap__dilator column-space-zone" :data-index="index" />
  </div>
</template>

<script>
export default {
  name: "ColumnGap",

  props: {
    index: {
      type: Number,
      required: true,
    },
    active: Boolean,
    visible: Boolean,
  },

  computed: {
    classes() {
      return [
        "column-gap",
        { "column-gap_active": this.active },
        { "column-gap_visible": this.visible },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
$block: ".column-gap";

#{$block} {
  flex: 0 0 var(--gap);
  align-self: stretch;
  position: relative;
  z-index: 10;
  width: var(--gap);

  &_active {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 3px;
      bottom: 0;
      left: 3px;
      background: var(--color-primary);
    }
  }

  &__dilator {
    display: none;
    position: absolute;
    top: 0;
    left: -50px;
    right: -50px;
    height: 100%;

    #{$block}_visible & {
      display: block;
    }
  }
}
</style>
