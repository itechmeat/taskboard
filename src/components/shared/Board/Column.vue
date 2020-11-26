<template>
  <section v-if="value" class="board-column">
    <header class="board-column__header">
      <input
        :value="value.name"
        class="board-column__name"
        @blur="handleNameBlur"
      />

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
      <ui-button
        expanded
        type="clear"
        class="ui-menu__control"
        @click="addCard"
      >
        Add another card
      </ui-button>
    </footer>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import BoardCard from "@/components/shared/Board/Card";
import { clearText } from "@/libs/utils";

export default {
  name: "BoardColumn",

  props: {
    value: {
      type: Object,
      required: true,
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
    ...mapActions("project", ["saveIssue"]),

    handleNameBlur(e) {
      console.log(e);
      const newText = clearText(e.target.value);
      if (newText === this.value.name) {
        return;
      }
      this.$emit("edit", {
        ...this.value,
        name: newText,
      });
    },

    addCard() {
      this.saveIssue({
        name: "Some Title Issue",
        description: "And description",
      });
      console.info("addCard (not implemented)");
    },

    deleteCards() {
      console.info("deleteCards (not implemented)");
    },

    deleteColumn() {
      this.$emit("delete", this.value.id);
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
    margin: -4px 0;
    padding: 4px var(--gap-0-5);
    border: none;
    border-radius: var(--border-raius);
    background: none;
    font-size: var(--font-size-base);
    font-weight: 600;

    &:focus {
      background: var(--color-bg);
      outline: none;
    }
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
