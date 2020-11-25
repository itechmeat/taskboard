<template>
  <div v-if="value" class="board-card">
    <router-link class="board-card__link" :to="'/project/' + value.id">
      <div class="board-card__label">{{ value.name }}</div>
      <ui-battery :progress="value.progress" />
    </router-link>
  </div>
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
  font-size: var(--font-size-base);

  &__link {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: var(--gap) var(--gap-0-5);
    border-radius: var(--border-raius);
    background: var(--color-light);
    box-shadow: 0 2px 0 -1px rgba(#000, 0.1);
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
