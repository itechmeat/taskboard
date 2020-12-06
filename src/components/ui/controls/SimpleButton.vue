<template>
  <button
    class="ui-simple-button"
    aria-label="Close"
    @click.prevent="$emit('click')"
  />
</template>

<script>
export default {
  name: "UiSimpleButton",
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".ui-simple-button";

#{$block} {
  @extend %resetButton;
  position: relative;
  width: var(--gap-1-5);
  height: var(--gap-1-5);
  border-radius: 50%;
  background: var(--color-bg-accent);
  outline: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: calc(50% - 1px);
    left: 25%;
    width: 50%;
    height: 2px;
    border-radius: 2px;
    background: var(--color-text-hint);
    pointer-events: none;
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover {
    &::before,
    &::after {
      background: var(--color-primary);
    }
  }
}
</style>
