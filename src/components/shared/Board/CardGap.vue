<template>
  <div :class="classes">
    <div
      class="card-gap__dilator card-space-zone"
      :data-index="index"
      :data-track="track"
    />
  </div>
</template>

<script>
export default {
  name: "CardGap",

  props: {
    index: {
      type: Number,
      required: true,
    },
    track: {
      type: String,
      required: true,
    },
    active: Boolean,
    visible: Boolean,
  },

  computed: {
    classes() {
      return [
        "card-gap",
        { "card-gap_active": this.active },
        { "card-gap_visible": this.visible },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
$block: ".card-gap";

#{$block} {
  position: relative;
  z-index: 10;
  height: var(--gap-0-5);

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
