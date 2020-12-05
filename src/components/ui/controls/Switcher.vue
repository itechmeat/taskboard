<template>
  <div :class="classes">
    <span class="ui-switcher__label" v-if="labelBefore">{{ labelBefore }}</span>
    <label class="ui-switcher__control">
      <input
        v-model="enabled"
        type="checkbox"
        class="ui-switcher__input"
        :disabled="disabled"
        @change="handleChange"
      />

      <span class="ui-switcher__field">
        <span class="ui-switcher__handler">
          <span v-if="power" class="ui-switcher__power" />
        </span>
      </span>
    </label>
    <span class="ui-switcher__label" v-if="labelAfter">{{ labelAfter }}</span>
  </div>
</template>

<script>
export default {
  name: "UiSwitcher",

  props: {
    value: Boolean,
    disabled: Boolean,
    power: Boolean,
    transparent: Boolean,
    size: {
      type: String,
      default: "medium",
    },
    labelBefore: {
      type: String,
      default: undefined,
    },
    labelAfter: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      enabled: false,
    };
  },

  computed: {
    classes() {
      return [
        "ui-switcher",
        "ui-switcher_" + this.size,
        { "ui-switcher_checked": this.value },
        { "ui-switcher_transparent": this.transparent },
        { "ui-switcher_disabled": this.disabled },
      ];
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.enabled = val;
      },
    },
  },

  methods: {
    handleChange(val) {
      this.$emit("change", val.target.checked);
    },
  },
};
</script>

<style lang="scss">
$block: ".ui-switcher";

#{$block} {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  &__label {
    margin: 0 var(--gap-0-5);

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__control {
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }

  &__input {
    position: absolute;
    left: -9999px;
  }

  &__field {
    display: block;
    position: relative;
    width: 38px;
    height: 22px;
    border: 1px solid var(--color-border);
    border-radius: 20px;
    background: var(--color-danger);
    transition: background 0.1s ease-in-out;
    cursor: pointer;

    #{$block}_disabled & {
      cursor: not-allowed;
    }

    #{$block}_checked & {
      background: var(--color-success);

      #{$block}__handler {
        transform: translateX(16px);
      }
    }

    #{$block}_big & {
      width: 46px;
      height: 30px;

      #{$block}__handler {
        top: 3px;
        left: 3px;
        width: 24px;
        height: 24px;
      }
    }

    #{$block}_transparent & {
      background: transparent;
    }
  }

  &__handler {
    overflow: hidden;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-light);
    transition: transform 0.1s ease-in-out;
    will-change: transform;
  }

  &__power {
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    border: 2px solid;
    border-radius: 50%;

    &::before {
      content: "";
      position: absolute;
      top: -8px;
      left: -1px;
      width: 10px;
      height: 10px;
      background: var(--color-light);
      transform: rotate(45deg);
    }

    &::after {
      content: "";
      position: absolute;
      top: -2px;
      left: calc(50% - 1px);
      height: 6px;
      border-left: 2px solid;
    }

    &,
    &::after {
      border-color: var(--color-danger);
      transition: border-color 0.1s ease-in-out;
    }

    #{$block}_checked #{$block}__field & {
      &,
      &::after {
        border-color: var(--color-success);
      }
    }

    #{$block}_big & {
      top: 5px;
      right: 5px;
      bottom: 5px;
      left: 5px;

      &::before {
        top: -7px;
        left: 0;
      }

      &::after {
        height: 8px;
      }
    }
  }
}
</style>
