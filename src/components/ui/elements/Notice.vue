<template>
  <div :class="classes">
    <div class="ui-alert__text">
      <slot />
    </div>
    <div v-if="canClose" class="ui-alert__control">
      <button
        class="ui-alert__close"
        aria-label="Close"
        @click.prevent="close"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "UiAlert",

  props: {
    type: {
      type: String,
      default: "default",
    },
    visible: Boolean,
    canClose: Boolean,
  },

  data() {
    return {
      isClosing: false,
    };
  },

  computed: {
    classes() {
      return {
        "ui-alert": true,
        ["ui-alert_" + this.type]: true,
        "ui-alert_visible": this.visible,
        "ui-alert_closing": this.isClosing,
      };
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

<style lang="scss">
@import "@/styles/system";

$block: ".ui-alert";

#{$block} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 700;
  bottom: var(--gap);
  left: 50%;
  width: 600px;
  max-width: 90vw;
  padding: var(--gap);
  border-radius: var(--border-raius);
  background: var(--color-bg-accent);
  box-shadow: 0 2px 4px rgba(#000, 0.3);
  transform: translate(-50%, 0);
  transition: transform 0.2s ease-out;
  will-change: transform;

  &_primary {
    background: var(--color-primary);
    color: var(--color-light);
  }

  &_danger {
    background: var(--color-danger);
  }

  &_warning {
    background: var(--color-warning);
  }

  &_success {
    background: var(--color-success);
  }

  &_visible {
    transform: translate(-50%, 0);
  }

  &:not(#{$block}_visible),
  &_closing {
    transform: translate(-50%, 300px);
    transition-timing-function: ease-in;
  }

  &__control {
    margin-left: var(--gap);
  }

  &__close {
    @extend %resetButton;
    position: relative;
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
  }
}
</style>
