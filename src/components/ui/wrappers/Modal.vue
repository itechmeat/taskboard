<template>
  <div :class="classes" @click.self="close">
    <div class="ui-modal__main">
      <slot />

      <button class="ui-modal__close" @click.prevent="close" />
    </div>
  </div>
</template>

<script>
export default {
  name: "UiModal",

  props: {
    visible: Boolean,
  },

  data() {
    return {
      isClosing: false,
    };
  },

  computed: {
    classes() {
      return [
        "ui-modal",
        { "ui-modal_visible": this.visible },
        { "ui-modal_closing": this.isClosing },
      ];
    },
  },

  methods: {
    close() {
      this.isClosing = true;
      setTimeout(() => {
        this.$emit("close");
        this.isClosing = false;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/system";

$block: ".ui-modal";

#{$block} {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(#000, 0.7);
  transition: opacity 0.2s;
  will-change: opacity;

  &,
  &_closing {
    z-index: -1;
    opacity: 0;
  }

  &_visible {
    &:not(#{$block}_closing) {
      z-index: 100;
      opacity: 1;
    }
  }

  &__main {
    flex: 0 0 100%;
    position: relative;
    width: 100vw;
    height: 100vh;
    padding: var(--gap-2);
    background: var(--color-light);

    @include display(desktop) {
      flex: 0 0 600px;
      width: 600px;
      height: auto;
      max-width: calc(100vw - var(--gap-2));
      max-height: calc(100vh - var(--gap-2));
      border-radius: var(--border-raius);
    }
  }

  &__close {
    @extend %resetButton;
    position: absolute;
    top: var(--gap-0-5);
    right: var(--gap-0-5);
    width: var(--gap-1-5);
    height: var(--gap-1-5);
    border-radius: 50%;
    background: var(--color-bg-accent);
    outline: none;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: calc(50% - 1px);
      left: 25%;
      width: 50%;
      height: 2px;
      border-radius: 2px;
      background: var(--color-text-hint);
      pointer-events: none;
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }

    &:hover {
      &::before,
      &::after {
        background: var(--color-primary);
      }
    }

    @include display(desktop) {
      top: calc(var(--gap-2) * -1);
      right: 0;
    }
  }
}
</style>
