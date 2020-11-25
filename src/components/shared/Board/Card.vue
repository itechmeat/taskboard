<template>
  <router-link v-if="value" class="board-card" :to="'/project/' + value.id">
    <div class="board-card__label">{{ value.name }}</div>
    <ui-battery :progress="value.progress" />
  </router-link>
</template>

<script>
export default {
  name: "BoardCard",

  props: {
    value: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".board-card";

#{$block} {
  & {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: var(--gap) var(--gap-0-5);
    border-radius: var(--border-raius);
    background: var(--color-light);
    box-shadow: 0 2px 0 -1px rgba(#000, 0.1);
    font-size: var(--font-size-base);
    text-decoration: none;
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
    will-change: transform, box-shadow;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 2px 1px rgba(#000, 0.1);
    }
  }

  &__label {
    margin-right: var(--gap);
  }
}
</style>
