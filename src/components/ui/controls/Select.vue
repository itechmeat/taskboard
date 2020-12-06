<template>
  <select class="ui-select">
    <option v-for="(option, index) in options" :key="index">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "UiSelect",

  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
$block: ".ui-select";

#{$block} {
}
</style>
