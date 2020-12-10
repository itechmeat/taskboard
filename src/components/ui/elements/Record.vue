<template>
  <span class="ui-record" />
</template>

<script>
export default {
  name: "UiRecord",
};
</script>

<style lang="scss" scoped>
$block: ".ui-record";

#{$block} {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-danger);
  animation: blink 2s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
