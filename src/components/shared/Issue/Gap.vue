<template>
  <div :class="classes" :data-index="index">
    <div class="issue-gap__dilator space-zone" :data-index="index" />
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
        "issue-gap",
        { "issue-gap_active": this.active },
        { "issue-gap_visible": this.visible },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
$block: ".issue-gap";

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
