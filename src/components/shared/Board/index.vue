<template>
  <main class="board" @dragover.prevent @drop.stop.prevent="handleDrop">
    <ColumnGap :index="0" :active="newIndex === 0" :visible="isDragActive" />

    <template v-for="(column, index) in tracks">
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
        :columns="tracks"
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
import { GET_TRACKS } from "@/store/modules/tracks/types";
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
      TrackIndex: null,
      newIndex: null,
      isDragActive: false,
    };
  },

  computed: {
    ...mapGetters("tracks", {
      tracks: GET_TRACKS,
    }),

    lastOrder() {
      if (!this.tracks || this.tracks.length === 0) {
        return 0;
      }

      return Math.max.apply(
        null,
        this.tracks.map((track) => track.order)
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
    this.fetchTracks();
    this.fetchIssues();
    this.fetchTasks();
  },

  mounted() {
    this.showNotice();
  },

  methods: {
    ...mapActions("tracks", [
      "fetchTracks",
      "saveTrack",
      "deleteTrack",
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
      let TrackIndex;
      if (state) {
        TrackIndex = Number(event.target.dataset.column);
      }
      this.TrackIndex = TrackIndex;
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
      console.log("handleDrop", this.newIndex, this.TrackIndex);
      if (this.newIndex !== null) {
        if (this.TrackIndex || this.TrackIndex === 0) {
          const tracks = [...this.tracks];
          const task = tracks[this.TrackIndex];
          if (this.TrackIndex < this.newIndex) {
            tracks.splice(this.newIndex, 0, task);
            tracks.splice(this.TrackIndex, 1);
          } else {
            tracks.splice(this.TrackIndex, 1);
            tracks.splice(this.newIndex, 0, task);
          }
          await this.updateOrders(tracks);
        }
      }

      this.$nextTick(() => {
        this.TrackIndex = null;
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

      this.saveTrack({
        name,
        order: this.lastOrder + 10,
      });
    },

    save(val) {
      this.saveTrack(val);
    },

    remove(id) {
      this.deleteTrack(id);
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
