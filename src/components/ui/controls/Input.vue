<template>
  <input
    v-model="text"
    :class="classes"
    ref="input"
    @focus="$emit('focus')"
    @blur="handleBlur"
    @input="handleInput"
    @keyup.enter="handleBlur"
  />
</template>

<script>
export default {
  name: "UiInput",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    size: {
      type: String,
      default: "medium",
    },
  },

  data() {
    return {
      text: "",
    };
  },

  computed: {
    classes() {
      return {
        "ui-input": true,
        ["ui-input_" + this.size]: true,
      };
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val === this.text) {
          return;
        }
        this.text = val;
      },
    },
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    },

    handleBlur() {
      // TODO: Add validation
      this.$nextTick(() => {
        this.$emit("change", this.text);
      });
    },

    handleInput() {
      this.$emit("input", this.text);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".ui-input";

#{$block} {
  @extend %resetInput;

  width: 100%;
  height: 32px;
  padding: 0 var(--gap-0-5);
  border: 1px solid var(--color-border);
  border-radius: var(--border-raius);
  outline: none;
  transition: 0.2s;

  &_small {
    height: 28px;
  }

  &_tiny {
    height: 24px;
  }

  &_big {
    height: 46px;
  }

  &_large {
    height: 64px;
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba($colorPrimary, 0.2);
  }
}
</style>
