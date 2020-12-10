<template>
  <div class="ui-time" :class="classes">
    <component
      v-if="!isInputActive"
      :is="tag"
      class="ui-time__result"
      @click="handleClick"
    >
      {{ result }}
    </component>

    <input
      v-else
      v-model="text"
      ref="input"
      class="ui-time__input"
      @blur="changeTime"
      @keyup.enter="changeTime"
    />
  </div>
</template>

<script>
import { splitTime, getReadableTime } from "@/libs/utils";

export default {
  name: "UiTime",

  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    type: {
      type: String,
      default: "default",
    },
    canChange: Boolean,
  },

  data() {
    return {
      text: "",
      isInputActive: false,
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        const time = splitTime(val);
        this.text = `${time.hours} ${time.minutes}`;
      },
    },
  },

  computed: {
    classes() {
      return {
        ["ui-time"]: true,
        ["ui-time_" + this.type]: true,
        "ui-time_changeable": this.canChange,
      };
    },

    tag() {
      if (!this.canChange) {
        return "div";
      }
      return "button";
    },

    result() {
      if (!this.value || this.value.length === 0) {
        return "0h";
      }

      return getReadableTime(this.value);
    },
  },

  methods: {
    handleClick() {
      if (!this.canChange) {
        return;
      }
      this.isInputActive = true;
      this.$emit("focus");
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    changeTime() {
      this.isInputActive = false;
      this.$emit("blur");
      // TODO: Add validation
      const arr = this.text.split(" ");

      let result = 0;

      if (arr.length === 1) {
        result = arr[0] * 60;
      } else {
        result = arr[0] * 60 * 60;
        result += Number(arr[1] * 60);
      }

      this.$emit("change", result);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".ui-time";

#{$block} {
  display: inline-block;
  padding: 4px;
  border-radius: var(--border-raius);
  background: var(--color-bg-accent);
  color: var(--color-text-hint);
  font-size: var(--font-size-small);
  font-weight: 500;

  &:focus-within {
    box-shadow: 0 0 0 1px var(--color-border);
  }

  &_primary {
    color: var(--color-primary);

    &:focus-within {
      box-shadow: 0 0 0 1px var(--color-primary);
    }
  }

  &__result {
    @extend %resetButton;
    cursor: default;

    #{$block}_changeable & {
      cursor: pointer;
    }
  }

  &__input {
    @extend %resetInput;
    width: 50px;
    outline: none;

    &,
    &:active,
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
