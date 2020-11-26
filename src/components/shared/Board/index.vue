<template>
  <main class="board">
    <div class="board__space" />
    <template v-for="column in statuses">
      <BoardColumn
        :key="column.id"
        :value="column"
        @edit="save"
        @delete="remove"
      />
      <div :key="column.id + 'Space'" class="board__space" />
    </template>

    <div class="board__new">
      <ui-button expanded type="primary" @click="add">Add column</ui-button>
    </div>

    <ui-modal :visible="isModalVisible" @close="closeModal">
      <Issue :columns="columns" />
    </ui-modal>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_STATUSES } from "@/store/modules/statuses/types";
import BoardColumn from "@/components/shared/Board/Column";
import Issue from "@/components/shared/Issue";

export default {
  name: "Board",

  components: {
    BoardColumn,
    Issue,
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
              name: "Card Number 1",
              progress: 0,
            },
            {
              id: "c2",
              name: "Card Number 2",
              progress: 0,
            },
          ],
        },
        {
          id: "2",
          name: "To Do",
          cards: [
            {
              id: "c3",
              name: "Card Number 3",
              progress: 67,
            },
            {
              id: "c4",
              name: "Card Number 4",
              progress: 84,
            },
            {
              id: "c5",
              name: "Card Number 5",
              progress: 25,
            },
            {
              id: "c6",
              name: "Card Number 6",
              progress: 10,
            },
            {
              id: "c7",
              name: "Card Number 7",
              progress: 38,
            },
          ],
        },
        {
          id: "3",
          name: "In Progress",
          cards: [
            {
              id: "c8",
              name: "Card Number 8",
              progress: 97,
            },
          ],
        },
        {
          id: "4",
          name: "Testing",
          cards: [],
        },
        {
          id: "5",
          name: "Done",
          cards: [
            {
              id: "c9",
              name: "Card Number 9",
              progress: 100,
            },
            {
              id: "c10",
              name: "Card Number 10",
              progress: 100,
            },
            {
              id: "c11",
              name: "Card Number 11",
              progress: 100,
            },
            {
              id: "c12",
              name: "Card Number 12",
              progress: 100,
            },
            {
              id: "c13",
              name: "Card Number 13",
              progress: 100,
            },
          ],
        },
      ],
      isModalVisible: false,
    };
  },

  computed: {
    ...mapGetters("statuses", {
      statuses: GET_STATUSES,
    }),

    lastOrder() {
      if (!this.statuses || this.statuses.length === 0) {
        return 0;
      }

      return Math.max.apply(
        null,
        this.statuses.map((status) => status.order)
      );
    },
  },

  watch: {
    "$route.params": {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val || !val.id) {
          this.isModalVisible = false;
          return;
        }
        this.isModalVisible = true;
      },
    },
  },

  created() {
    this.fetchStatuses();
  },

  methods: {
    ...mapActions("statuses", ["fetchStatuses", "saveStatus", "deleteStatus"]),

    add() {
      const name = prompt("Name of the Status", "New Status");

      this.saveStatus({
        name,
        order: this.lastOrder + 10,
      });
    },

    save(val) {
      this.saveStatus(val);
    },

    remove(id) {
      console.log("remove", id);
      this.deleteStatus(id);
    },

    closeModal() {
      this.$router.push("/");
    },
  },
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

  &__new {
    flex: 0 0 auto;
    width: 240px;
    box-sizing: border-box;
    padding-right: var(--gap);
  }
}
</style>
