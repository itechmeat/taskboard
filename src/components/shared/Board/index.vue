<template>
  <main class="board" @dragover.prevent @drop.stop.prevent="handleDrop">
    <ColumnGap :index="0" :active="newIndex === 0" :visible="isDragActive" />

    <template v-for="(column, index) in statuses">
      <BoardColumn
        :key="column.id"
        :value="column"
        :index="index"
        @edit="save"
        @delete="remove"
      />

      <ColumnGap
        :key="index + 'Gap'"
        :index="index + 1"
        :active="newIndex === index + 1"
        :visible="isDragActive"
      />
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
import ColumnGap from "@/components/shared/Board/ColumnGap";

export default {
  name: "Board",

  components: {
    BoardColumn,
    Issue,
    ColumnGap,
  },

  data() {
    return {
      isModalVisible: false,
      isNoticeVisible: false,
      visibleIssueId: null,
      isDropZoneActive: false,
      StatusIndex: null,
      newIndex: null,
      isDragActive: false,
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

  beforeMount() {
    this.$nextTick(() => {
      this.removeListeners();
      this.addListeners();
    });
  },

  beforeDestroy() {
    this.removeListeners();
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
    ...mapActions("statuses", [
      "fetchStatuses",
      "saveStatus",
      "deleteStatus",
      "updateOrders",
    ]),
    ...mapActions("issues", ["fetchIssues"]),
    ...mapActions("tasks", ["fetchTasks"]),

    addListeners() {
      document.addEventListener(
        "dragstart",
        (event) => this.handleDrag(event, true),
        false
      );

      document.addEventListener(
        "dragend",
        (event) => this.handleDrag(event, false),
        false
      );

      document.addEventListener(
        "dragenter",
        (event) => this.handleDropZone(event, true),
        false
      );

      document.addEventListener(
        "dragleave",
        (event) => this.handleDropZone(event, false),
        false
      );
    },

    removeListeners() {
      document.removeEventListener(
        "dragstart",
        (event) => this.handleDrag(event, true),
        false
      );

      document.removeEventListener(
        "dragend",
        (event) => this.handleDrag(event, false),
        false
      );

      document.removeEventListener(
        "dragenter",
        (event) => this.handleDropZone(event, true),
        false
      );

      document.removeEventListener(
        "dragleave",
        (event) => this.handleDropZone(event, false),
        false
      );
    },

    handleDrag(event, state) {
      this.isDragActive = state;
      let StatusIndex;
      if (state) {
        StatusIndex = Number(event.target.dataset.column);
      }
      this.StatusIndex = StatusIndex;
    },

    handleDropZone(event, state) {
      if (event.target.className.includes("column-space-zone")) {
        if (!state) {
          this.newIndex = null;
          return;
        }
        this.isDropZoneActive = state;
        this.newIndex = Number(event.target.dataset.index);
      }
    },

    async handleDrop() {
      console.log("handleDrop", this.newIndex, this.StatusIndex);
      if (this.newIndex !== null) {
        if (this.StatusIndex || this.StatusIndex === 0) {
          const statuses = [...this.statuses];
          const task = statuses[this.StatusIndex];
          if (this.StatusIndex < this.newIndex) {
            statuses.splice(this.newIndex, 0, task);
            statuses.splice(this.StatusIndex, 1);
          } else {
            statuses.splice(this.StatusIndex, 1);
            statuses.splice(this.newIndex, 0, task);
          }
          await this.updateOrders(statuses);
        }
      }

      this.$nextTick(() => {
        this.StatusIndex = null;
        this.newIndex = null;
        this.isDropZoneActive = false;
      });
    },

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

  &__new {
    flex: 0 0 auto;
    width: 240px;
    box-sizing: border-box;
    padding-right: var(--gap);
  }
}
</style>
