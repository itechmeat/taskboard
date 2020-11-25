<template>
  <div
    v-click-outside="closeMenu"
    :class="['ui-menu', { 'ui-menu_open': isOpen }]"
  >
    <ui-button type="clear" class="ui-menu__control" @click="handleClick">
      =
    </ui-button>

    <div class="ui-menu__dropdown">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "UiMenu",

  props: {
    position: {
      // Todo: premature implementation
      type: String,
      default: "bottom right",
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    handleClick() {
      this.isOpen = !this.isOpen;
    },

    closeMenu() {
      if (!this.isOpen) {
        return;
      }
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
$block: ".ui-menu";

#{$block} {
  position: relative;

  &__control {
    vertical-align: bottom;
  }

  &__dropdown {
    position: absolute;
    z-index: 10;
    top: 100%;
    right: 0;
    padding: var(--gap-0-5) 0;
    border-radius: var(--border-raius);
    background: var(--color-light);
    box-shadow: 0 1px 0 1px rgba(#000, 0.1);
    transform: translateY(-50%) scaleY(0);
    opacity: 0;
    transition: transform 0.1s ease-in, opacity 0.1s ease-in;
    will-change: transform, opacity;

    #{$block}_open & {
      transition: transform 0.2s cubic-bezier(0.32, 0.16, 0.23, 1.3),
        opacity 0.2s ease-out;
      transform: translateY(0) scaleY(1);
      opacity: 1;
    }
  }
}
</style>
