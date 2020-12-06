<template>
  <input
    v-model="text"
    ref="input"
    class="ui-input"
    @focus="$emit('focus')"
    @blur="handleBlur"
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
  },

  data() {
    return {
      text: "",
    };
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
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".ui-input";

#{$block} {
}
</style>
