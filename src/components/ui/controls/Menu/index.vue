<template>
  <div :class="['ui-menu', 'ui-menu_' + type, { 'ui-menu_open': isOpen }]">
    <ui-button
      v-click-outside="closeMenu"
      :type="type"
      class="ui-menu__control"
      aria-label="Menu"
      @click="handleClick"
    >
      <span class="ui-menu__label">
        {{ label }}
      </span>
      <span class="ui-menu__icon" />
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
    type: {
      type: String,
      default: "clear",
    },
    label: {
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
  display: inline-block;
  position: relative;
  user-select: none;

  &__control {
    position: relative;
    vertical-align: bottom;
  }

  &__label {
    padding-right: var(--gap);
  }

  &__icon {
    position: absolute;
    top: calc(50% - 1px);
    right: calc(50% - 1px);
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

    #{$block}_primary &,
    #{$block}_success & {
      background: var(--color-light);
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

  &__label + &__icon {
    left: auto;
    right: var(--gap);
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
}
</style>
