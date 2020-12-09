<template>
  <div :class="classes" @click.self="close">
    <div class="ui-modal__main">
      <div class="ui-modal__content">
        <slot />
      </div>

      <div v-if="$slots.cancel || $slots.submit" class="ui-modal__footer">
        <slot class="cancel" />
        <div class="space" />
        <slot class="submit" />
      </div>

      <div class="ui-modal__close">
        <ui-simple-button @click="close" />
      </div>
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

<style lang="scss">
@import "@/styles/system";

$block: ".ui-modal";

#{$block} {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(#000, 0.7);
  transition: opacity 0.2s;
  will-change: opacity;

  &,
  &_closing {
    opacity: 0;
  }

  &_visible {
    z-index: 100;

    &:not(#{$block}_closing) {
      opacity: 1;
    }
  }

  &__main {
    flex: 0 0 100%;
    position: relative;
    width: 100vw;
    background: var(--color-light);

    @include display(desktop) {
      flex: 0 0 600px;
      width: 600px;
      max-width: calc(100vw - var(--gap-2));
      border-radius: var(--border-raius);
    }
  }

  &__content {
    overflow-y: auto;
    padding: var(--gap-2);
  }

  &__main,
  &__content {
    height: 100vh;

    @include display(desktop) {
      max-height: calc(100vh - var(--gap-2) * 3);
      height: auto;
    }
  }

  &__footer {
    margin-top: var(--gap-2);
    padding-top: var(--gap-2);
    border-top: 1px solid var(--color-border);
  }

  &__close {
    position: absolute;
    z-index: 10;
    top: var(--gap-0-5);
    right: var(--gap-0-5);

    @include display(desktop) {
      top: calc(var(--gap-2) * -1);
      right: 0;
    }
  }
}
</style>
