<template>
  <main class="board">
    <div class="board__space" />
    <template v-for="column in columns">
      <BoardColumn :key="column.id" :name="column.name" :cards="column.cards" />
      <div :key="column.id + 'Space'" class="board__space" />
    </template>
  </main>
</template>

<script>
import BoardColumn from "@/components/shared/Board/Column";

export default {
  name: "Board",

  components: {
    BoardColumn
  },

  data() {
    return {
      columns: [
        {
          id: "1",
          name: "Backlog",
          cards: [
            {
              id: "c1",
              name: "Card Number 1"
            },
            {
              id: "c2",
              name: "Card Number 2"
            }
          ]
        },
        {
          id: "2",
          name: "To Do",
          cards: []
        },
        {
          id: "3",
          name: "In Progress",
          cards: [
            {
              id: "c3",
              name: "Card Number 3"
            }
          ]
        },
        {
          id: "4",
          name: "Done",
          cards: [
            {
              id: "c4",
              name: "Card Number 4"
            },
            {
              id: "c5",
              name: "Card Number 5"
            },
            {
              id: "c6",
              name: "Card Number 6"
            },
            {
              id: "c7",
              name: "Card Number 7"
            },
            {
              id: "c8",
              name: "Card Number 8"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss">
$block: ".board";

#{$block} {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  overflow-x: auto;
  position: relative;
  max-width: 100%;
  height: 100%;
  padding: var(--gap) 0;

  &__space {
    flex: 0 0 var(--gap);
    align-self: stretch;
  }
}
</style>
