<template>
  <main class="board" @dragover.prevent @drop.stop.prevent="handleDrop">
    <ColumnGap
      :index="0"
      :active="newTrackIndex === 0"
      :visible="isColumnDragActive"
    />

    <template v-for="(column, index) in tracks">
      <BoardColumn
        :key="column.id"
        :value="column"
        :index="index"
        :gap-active="isCardDragActive"
        :over-card-index="newCardIndex"
        :over-track-id="targetTrack"
        @edit="save"
        @delete="remove"
      />

      <ColumnGap
        :key="index + 'Gap'"
        :index="index + 1"
        :active="newTrackIndex === index + 1"
        :visible="isColumnDragActive"
      />
    </template>

    <div class="board__new">
      <ui-button expanded type="primary" @click="add">Add column</ui-button>
    </div>

    <ui-modal :visible="isModalVisible" @close="closeModal">
      <Issue
        v-if="visibleIssueId"
        :id="visibleIssueId"
        :tracks="tracks"
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
      trackIndex: null,
      newTrackIndex: null,
      cardIndex: null,
      newCardIndex: null,
      isColumnDragActive: false,
      isCardDragActive: false,
      cardId: null,
      oldTrack: null,
      targetTrack: null,
      dragType: undefined,
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
        if (!val || !val.issue) {
          this.isModalVisible = false;
          this.visibleIssueId = null;
          return;
        }
        this.visibleIssueId = val.issue;
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

  mounted() {
    this.showNotice();
  },

  methods: {
    ...mapActions("tracks", [
      "saveTrack",
      "deleteTrack",
      "updateOrders",
      "moveIssue",
    ]),

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

      document.addEventListener("dragend", () => this.handleDropEnd(), false);
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

      document.removeEventListener(
        "dragend",
        () => this.handleDropEnd(),
        false
      );
    },

    handleDrag(event, state) {
      let dragType;
      if (event.target.dataset.column) {
        dragType = "column";
      }
      if (event.target.dataset.issue) {
        dragType = "card";
      }
      this.dragType = dragType;

      if (dragType === "column") {
        this.isColumnDragActive = state;
        let trackIndex;
        if (state) {
          trackIndex = Number(event.target.dataset.column);
        }
        this.trackIndex = trackIndex;
        return;
      }

      if (dragType === "card") {
        this.oldTrack = event.target.dataset.track;
        const oldTrack = this.tracks.find(
          (track) => track.id === this.oldTrack
        );
        this.cardId = oldTrack.issues[event.target.dataset.issue];
        this.isCardDragActive = state;
        let cardIndex;
        if (state) {
          cardIndex = Number(event.target.dataset.issue);
        }
        this.cardIndex = cardIndex;
      }
    },

    handleDropZone(event, state) {
      if (event.target.className.includes("column-space-zone")) {
        if (!state) {
          this.newTrackIndex = null;
          return;
        }
        this.newTrackIndex = Number(event.target.dataset.index);
      }

      if (event.target.className.includes("card-space-zone")) {
        if (!state) {
          this.newCardIndex = null;
          this.targetTrack = null;
          return;
        }
        this.newCardIndex = Number(event.target.dataset.index);
        this.targetTrack = event.target.dataset.track;
      }
    },

    async handleDrop() {
      if (this.dragType === "column") {
        if (this.newTrackIndex !== null) {
          if (this.trackIndex || this.trackIndex === 0) {
            const tracks = [...this.tracks];
            const task = tracks[this.trackIndex];
            if (this.trackIndex < this.newTrackIndex) {
              tracks.splice(this.newTrackIndex, 0, task);
              tracks.splice(this.trackIndex, 1);
            } else {
              tracks.splice(this.trackIndex, 1);
              tracks.splice(this.newTrackIndex, 0, task);
            }
            await this.updateOrders(tracks);
          }
        }
      }

      if (this.dragType === "card") {
        await this.moveIssue({
          issueId: this.cardId,
          oldTrackId: this.oldTrack,
          newTrackId: this.targetTrack,
          newIndex: this.newCardIndex,
        });
      }

      this.$nextTick(() => {
        this.handleDropEnd();
      });
    },

    handleDropEnd() {
      this.trackIndex = null;
      this.newTrackIndex = null;
      this.cardIndex = null;
      this.newCardIndex = null;
      this.cardId = null;
      this.oldTrack = null;
      this.targetTrack = null;
      this.dragType = undefined;
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
      this.$router.push(`/projects/${this.$route.params.project}/board`);
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
