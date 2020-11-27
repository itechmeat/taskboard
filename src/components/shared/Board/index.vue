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
      <Issue
        v-if="visibleIssueId"
        :id="visibleIssueId"
        :columns="statuses"
        @close="closeModal"
      />
    </ui-modal>

    <ui-notice
      can-close
      type="primary"
      :visible="isNoticeVisible"
      @close="closeNotice"
    >
      Please open the "Add Drag&Drop for entities" Issue to test changing and
      Drag&Drop of tasks.
    </ui-notice>
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
      isModalVisible: false,
      isNoticeVisible: false,
      visibleIssueId: null,
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
          this.visibleIssueId = null;
          return;
        }
        this.visibleIssueId = val.id;
        this.isModalVisible = true;
      },
    },
  },

  created() {
    this.fetchStatuses();
    this.fetchIssues();
    this.fetchTasks();
  },

  mounted() {
    this.showNotice();
  },

  methods: {
    ...mapActions("statuses", ["fetchStatuses", "saveStatus", "deleteStatus"]),
    ...mapActions("issues", ["fetchIssues"]),
    ...mapActions("tasks", ["fetchTasks"]),

    showNotice() {
      if (!localStorage.closedTaskNotice) {
        setTimeout(() => {
          this.isNoticeVisible = true;
        }, 3000);
      }
    },

    closeNotice() {
      this.isNoticeVisible = false;
      localStorage.closedTaskNotice = true;
    },

    add() {
      const name = prompt("Name of the Column", "New Column");

      this.saveStatus({
        name,
        order: this.lastOrder + 10,
      });
    },

    save(val) {
      this.saveStatus(val);
    },

    remove(id) {
      this.deleteStatus(id);
    },

    closeModal() {
      this.$router.push("/project");
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
