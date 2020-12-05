<template>
  <div class="ui-spinner" :style="styles" />
</template>

<script>
export default {
  name: "UiSpinner",

  props: {
    size: {
      type: Number,
      default: 64,
    },
    color: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    styles() {
      return {
        width: this.size + "px",
        height: this.size + "px",
        borderTopColor: this.color,
        borderTopWidth: this.size / 12 + "px",
        borderRightWidth: this.size / 12 + "px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$block: ".ui-spinner";

#{$block} {
  width: 64px;
  height: 64px;
  border-top: 5px solid var(--color-primary);
  border-right: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
