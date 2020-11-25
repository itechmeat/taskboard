<template>
  <li v-if="value" class="board-card">
    <router-link class="board-card__link" :to="'/project/' + value.id">
      <div class="board-card__label">{{ value.name }}</div>
      <div class="board-card__scale">
        <div class="board-card__progress" :style="progressStyles"></div>
      </div>
    </router-link>
  </li>
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

  computed: {
    progressStyles() {
      if (!this.value) {
        return;
      }

      const progress = this.value.progress || 0;
      let background;

      switch (true) {
        case progress > 25 && progress < 50:
          background = "var(--color-warning)";
          break;
        case progress >= 50 && progress < 75:
          background = "var(--color-accent)";
          break;
        case progress >= 75 && progress < 100:
          background = "var(--color-primary)";
          break;
        case progress === 100:
          background = "var(--color-success)";
          break;
        default:
          background = "var(--color-danger)";
      }

      return {
        height: progress + "%",
        background,
      };
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
    display: block;
    position: relative;
    padding: var(--gap) calc(var(--gap) - 4px);
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

  &__scale {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background: var(--color-bg);
  }

  &__progress {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--color-text);
  }
}
</style>
