<template>
  <section class="board-column">
    <header class="board-column__header">
      <h2 class="board-column__name" contenteditable>
        {{ name }}
      </h2>

      <ui-menu class="board-column__menu">
        <ui-menu-item @click="addCard">Add Card</ui-menu-item>
        <ui-menu-item @click="deleteCards">Delete all cards</ui-menu-item>
        <ui-menu-item @click="deleteColumn">Delete this column</ui-menu-item>
        <ui-menu-item to="/">Inner link</ui-menu-item>
        <ui-menu-item href="https://google.com">Outer link</ui-menu-item>
      </ui-menu>
    </header>

    <div class="board-column__list">
      <div class="board-column__space" />
      <template v-for="card in cards">
        <BoardCard :key="card.id" :value="card" />
        <div :key="card.id + 'Space'" class="board-column__space" />
      </template>
    </div>

    <footer class="board-column__footer">
      <button>Add another card</button>
    </footer>
  </section>
</template>

<script>
import BoardCard from "@/components/shared/Board/Card";

export default {
  name: "BoardColumn",

  props: {
    name: {
      type: String,
      default: "New Column",
    },
    cards: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    BoardCard,
  },

  methods: {
    addCard() {
      console.info("addCard (not implemented)");
    },

    deleteCards() {
      console.info("deleteCards (not implemented)");
    },

    deleteColumn() {
      console.info("deleteColumn (not implemented)");
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".board-column";

#{$block} {
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  border-radius: var(--border-raius);
  background: var(--color-bg-accent);

  &__header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--gap-0-5);
  }

  &__name {
    flex: 1;
    margin: 0;
    font-size: var(--font-size-base);
    font-weight: 600;
  }

  &__menu {
    flex: 0 0 auto;
    margin: 0 0 0 var(--gap-0-5);
  }

  &__list {
    @extend %resetList;
    flex: 1;
    padding: 0 var(--gap-0-5);
  }

  &__space {
    height: var(--gap-0-5);
  }

  &__footer {
    flex: 0 0 auto;
    padding: var(--gap-0-5);
  }
}
</style>
