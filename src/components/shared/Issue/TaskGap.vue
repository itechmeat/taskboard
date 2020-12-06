<template>
  <div :class="classes">
    <div class="task-gap__dilator task-space-zone" :data-index="index" />
  </div>
</template>

<script>
export default {
  name: "IssueGap",

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
        "task-gap",
        { "task-gap_active": this.active },
        { "task-gap_visible": this.visible },
      ];
    },
  },
};
</script>

<style lang="scss">
$block: ".task-gap";

#{$block} {
  position: relative;
  z-index: 10;
  height: 4px;
  margin-left: -20px;

  &_active {
    background: var(--color-primary);
  }

  &__dilator {
    display: none;
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: 0;
    width: 100%;

    #{$block}_visible & {
      display: block;
    }

    #{$block}_active & {
      //background: var(--color-primary);
    }
  }
}
</style>
