<template>
  <div class="ui-battery" :class="progressMod" />
</template>

<script>
export default {
  name: "UiBattery",

  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    progressMod() {
      const mod = "ui-battery";

      if (this.progress >= 50 && this.progress < 80) {
        return `${mod}_warning`;
      }

      if (this.progress >= 80 && this.progress < 100) {
        return `${mod}_primary`;
      }

      if (this.progress === 100) {
        return `${mod}_success`;
      }

      return `${mod}_danger`;
    },
  },
};
</script>

<style lang="scss">
$block: ".ui-battery";

#{$block} {
  display: inline-block;
  position: relative;
  width: 12px;
  height: 17px;
  border: 2px solid var(--color-border);
  border-radius: 3px;
  background: var(--color-light);
  box-shadow: 0 -5px 0 -4px var(--color-border);

  &::before,
  &::after {
    content: "";
    display: block;
    height: 5px;
    margin: 1px;
    border: inherit;
    border-width: 2px 0;
  }

  &_danger {
    border-color: var(--color-danger);
    box-shadow: 0 -5px 0 -4px var(--color-danger);

    &::before {
      border-color: transparent;
    }

    &::after {
      border-top-color: transparent;
    }
  }

  &_warning {
    border-color: var(--color-warning);
    box-shadow: 0 -5px 0 -4px var(--color-warning);

    &::before {
      border-color: transparent;
    }
  }

  &_primary {
    border-color: var(--color-primary);
    box-shadow: 0 -5px 0 -4px var(--color-primary);

    &::before {
      border-top-color: transparent;
    }
  }

  &_success {
    border-color: var(--color-success);
    box-shadow: 0 -5px 0 -4px var(--color-success);
  }
}
</style>
