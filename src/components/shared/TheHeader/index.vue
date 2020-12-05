<template>
  <header class="header">
    <router-link to="/" class="header__brand">TaskBoard</router-link>

    <div class="space" />

    <div v-if="isModeVisible" class="header__mode">
      <ui-switcher
        v-model="isBoard"
        label-before="Feed"
        label-after="Board"
        transparent
        @change="switchMode"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      isBoard: false,
    };
  },

  computed: {
    isModeVisible() {
      return (
        this.$route.name === "ProjectFeed" ||
        this.$route.name === "ProjectBoard"
      );
    },
  },

  mounted() {
    this.isBoard = this.$route.name === "ProjectBoard";
  },

  methods: {
    switchMode() {
      this.isBoard = !this.isBoard;
      let mode = "feed";
      if (this.isBoard) {
        mode = "board";
      }
      if (
        (this.$route.name === "ProjectFeed" && !this.isBoard) ||
        (this.$route.name === "ProjectBoard" && this.isBoard)
      ) {
        return;
      }
      this.$router.push("/projects/demo/" + mode);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".header";

#{$block} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 var(--gap);
  background: var(--color-primary);
  box-shadow: 0 4px 16px rgba($colorShadow, 0.2);
  color: var(--color-light);

  &__brand {
    margin: 0 var(--gap-2) 0 0;
    font-size: var(--font-size-legend);
    font-weight: 500;
    text-decoration: none;
  }

  &__mode {
    flex: 0 0 auto;
  }
}
</style>
