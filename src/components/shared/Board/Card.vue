<template>
  <li v-if="value" class="board-card">
    <router-link class="board-card__link" :to="'/project/' + value.id">
      {{ value.name }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: "ProjectCard",

  props: {
    value: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
$block: ".board-card";

#{$block} {
  font-size: var(--font-size-base);

  &__link {
    display: block;
    padding: var(--gap);
    border-radius: var(--border-raius);
    background: var(--color-light);
    box-shadow: 0 2px 0 -1px rgba(#000, 0.1);
    text-decoration: none;
    transition: transform 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out;
    will-change: transform, box-shadow;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 2px 1px rgba(#000, 0.1);
    }
  }
}
</style>
