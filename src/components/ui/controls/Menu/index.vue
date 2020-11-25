<template>
  <div :class="['ui-menu', { 'ui-menu_open': isOpen }]">
    <ui-button
      v-click-outside="closeMenu"
      type="clear"
      class="ui-menu__control"
      @click="handleClick"
    >
      <span class="ui-menu__icon" />
    </ui-button>

    <div class="ui-menu__dropdown">
      <div v-if="title" class="ui-menu__title">{{ title }}</div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "UiMenu",

  props: {
    title: {
      type: String,
      default: undefined,
    },
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
    position: relative;
    vertical-align: bottom;
  }

  &__icon {
    position: absolute;
    top: calc(50% - 1px);
    left: calc(50% - 1px);
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: var(--color-text-hint);
    pointer-events: none;
    transition: transform 0.2s;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: -5px;
      left: 0;
      width: inherit;
      height: inherit;
      border-radius: 50%;
      background: inherit;
      transition: transform 0.2s;
    }

    &::after {
      top: 5px;
    }

    #{$block}_open & {
      transform: translateY(2px) rotate(90deg);

      &::before {
        transform: translate(-3px, 9px);
      }

      &::after {
        transform: translate(-3px, -9px);
      }
    }
  }

  &__dropdown {
    position: absolute;
    z-index: 10;
    top: 100%;
    right: 0;
    padding: var(--gap-0-5) 0;
    border-radius: var(--border-raius);
    background: var(--color-light);
    box-shadow: 0 1px 0 1px rgba(#000, 0.1), 0 1px 3px rgba(#000, 0.2);
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

  &__title {
    margin: 0 0 var(--gap-0-5);
    padding: 0 var(--gap);
    font-size: var(--font-size-base);
    font-weight: 600;
    text-align: center;
  }
}
</style>
