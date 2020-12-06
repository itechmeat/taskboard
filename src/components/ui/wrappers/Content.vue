<template>
  <div class="ui-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: "UiContent",
};
</script>

<style lang="scss" scoped>
$block: ".ui-content";

#{$block} {
}
</style>
