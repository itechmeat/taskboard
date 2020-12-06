<template>
  <div class="ui-article">
    <slot />
  </div>
</template>

<script>
export default {
  name: "UiArticle",
};
</script>

<style lang="scss">
$block: ".ui-article";

#{$block} {
  flex: 1;
  padding: 60px 0;
  background: var(--color-light);
}
</style>
