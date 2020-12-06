<template>
  <article v-if="value" class="issue">
    <header class="issue__header">
      <div class="issue__progress">
        <ui-battery :progress="value.progress" />
      </div>
      <input
        v-model="value.name"
        class="issue__title"
        placeholder="Enter name of the issue"
        @blur="save"
      />

      <div v-if="canClose" class="issue__close">
        <ui-simple-button @click="$emit('close')" />
      </div>
    </header>

    <div class="issue__actions">
      <ui-time :value="value.estimate || 0" />

      <div class="space" />

      <div v-if="false" class="issue__action">
        <div class="issue__track">
          <ui-menu type="success" label="Paid in part">
            <ui-menu-title>Payment status</ui-menu-title>
            <ui-menu-item>Not paid</ui-menu-item>
            <ui-menu-item>Billed</ui-menu-item>
            <ui-menu-item>Paid up</ui-menu-item>
          </ui-menu>
        </div>
      </div>

      <div class="issue__action">
        <div class="issue__track">
          <ui-menu type="primary" :label="currentTrack.name">
            <ui-menu-title>Move to track</ui-menu-title>
            <ui-menu-item
              v-for="track in availableTracks"
              :key="track.id"
              @click="changeTrack(track.id)"
            >
              {{ track.name }}
            </ui-menu-item>
          </ui-menu>
        </div>
      </div>

      <div class="issue__action">
        <ui-button type="danger" @click="remove">Remove</ui-button>
      </div>
    </div>

    <h3 class="issue__legend">Description</h3>
    <div
      class="issue__description"
      contenteditable
      :data-placeholder="description"
      @blur="handleDescriptionBlur"
      v-html="value.description"
    />

    <h3 class="issue__legend">Tasks</h3>

    <div class="issue__tasks" @dragover.prevent @drop.stop.prevent="handleDrop">
      <TaskGap :index="0" :active="newIndex === 0" :visible="isDragActive" />
      <template v-for="(task, index) in value.tasks">
        <div :key="task" class="issue__task">
          <Task
            :id="task"
            :index="index"
            @update="updateTask"
            @delete="removeTask"
          />
        </div>

        <TaskGap
          :key="index + 'Gap'"
          :index="index + 1"
          :active="newIndex === index + 1"
          :visible="isDragActive"
        />
      </template>
      <li class="issue__task">
        <ui-button
          expanded
          type="clear"
          class="ui-menu__control"
          @click="addTask"
        >
          Add new task
        </ui-button>
      </li>
    </div>
  </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_ISSUE_BY_ID } from "@/store/modules/issues/types";
import { GET_TASK_BY_ID } from "@/store/modules/tasks/types";
import Task from "@/components/shared/Issue/Task";
import TaskGap from "@/components/shared/Issue/TaskGap";
import { clearText } from "@/libs/utils";

export default {
  name: "Issue",

  components: {
    Task,
    TaskGap,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    tracks: {
      type: Array,
      default: () => [],
    },
    canClose: Boolean,
  },

  data() {
    return {
      value: null,
      taskIndex: null,
      newIndex: null,
      isDragActive: false,
    };
  },

  computed: {
    ...mapGetters("issues", {
      issue: GET_ISSUE_BY_ID,
    }),
    ...mapGetters("tasks", {
      task: GET_TASK_BY_ID,
    }),

    description() {
      if (
        !this.value ||
        (this.value.description && this.value.description.length > 0)
      ) {
        return;
      }
      return "Enter the description for the Issue";
    },

    currentTrack() {
      if (!this.value || !this.tracks) {
        return;
      }

      return this.tracks.find((track) => track.id === this.value.trackId);
    },

    availableTracks() {
      if (!this.value || !this.tracks) {
        return;
      }

      return this.tracks
        .map((track) => {
          if (track.id === this.value.trackId) {
            return;
          }
          return track;
        })
        .filter(Boolean);
    },
  },

  watch: {
    id: {
      immediate: true,
      async handler(val) {
        if (!val) {
          return;
        }

        let issue = this.issue(val);

        if (!issue) {
          await this.fetchIssues();
          issue = this.issue(val);
        }

        this.value = issue;
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

  methods: {
    ...mapActions("issues", ["fetchIssues", "saveIssue", "deleteIssue"]),
    ...mapActions("tasks", ["fetchTasks", "saveTask", "deleteTask"]),

    async save() {
      await this.saveIssue(this.value);
    },

    async changeTrack(id) {
      const oldId = this.value.trackId;

      if (id === oldId) {
        return;
      }

      await this.saveIssue({
        ...this.value,
        trackId: id,
        oldTrackId: oldId,
      });

      await this.fetchIssues();
      this.value = this.issue(this.value.id);
    },

    async handleDescriptionBlur(e) {
      const newText = clearText(e.target.innerHTML);
      if (newText === this.value.description) {
        return;
      }
      this.value.description = newText;
      await this.saveIssue({
        ...this.value,
        description: newText,
      });
    },

    async remove() {
      if (this.value.tasks.length > 0) {
        this.value.tasks.forEach((id) => {
          this.deleteTask(id);
        });
      }
      await this.deleteIssue(this.id);
      this.$emit("close");
    },

    async addTask() {
      const name = prompt("Name of the Task", "New Task");

      const taskId = await this.saveTask({
        name,
        progress: 0,
        isDone: false,
      });

      const tasks = this.value.tasks || [];
      tasks.push(taskId);

      await this.calculateProgress();

      await this.saveIssue({
        ...this.value,
        tasks,
      });

      await this.fetchIssues();
    },

    async updateTask() {
      await this.calculateEstimation();
      await this.calculateProgress();
      await this.saveIssue(this.value);
    },

    async calculateEstimation() {
      let result = 0;

      this.value.tasks.forEach((id) => {
        const taskData = this.task(id);
        if (taskData) {
          result += taskData.estimate || 0;
        }
      });

      this.value.estimate = result;
    },

    async calculateProgress() {
      await this.fetchTasks();

      let completedTasks = 0;

      this.value.tasks.forEach((id) => {
        const taskData = this.task(id);
        if (taskData) {
          if (taskData.isDone) {
            completedTasks++;
          }
        }
      });

      this.value.progress =
        Math.ceil(completedTasks * 100) / this.value.tasks.length;
    },

    async removeTask(id) {
      const index = this.value.tasks.findIndex((task) => task === id);
      this.value.tasks.splice(index, 1);
      await this.calculateEstimation();
      await this.calculateProgress();
      await this.saveIssue(this.value);
    },

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
      let taskIndex;
      if (state) {
        taskIndex = Number(event.target.dataset.task);
      }
      this.taskIndex = taskIndex;
    },

    handleDropZone(event, state) {
      if (event.target.className.includes("task-space-zone")) {
        if (!state) {
          this.newIndex = null;
          return;
        }
        this.newIndex = Number(event.target.dataset.index);
      }
    },

    async handleDrop() {
      if (this.newIndex !== null) {
        if (this.taskIndex || this.taskIndex === 0) {
          const task = this.value.tasks[this.taskIndex];
          if (this.taskIndex < this.newIndex) {
            this.value.tasks.splice(this.newIndex, 0, task);
            this.value.tasks.splice(this.taskIndex, 1);
          } else {
            this.value.tasks.splice(this.taskIndex, 1);
            this.value.tasks.splice(this.newIndex, 0, task);
          }
          await this.saveIssue(this.value);
        }
      }

      this.$nextTick(() => {
        this.taskIndex = null;
        this.newIndex = null;
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".issue";

#{$block} {
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 var(--gap);
  }

  &__progress {
    display: flex;
    align-items: center;
    margin-right: var(--gap);
  }

  &__title {
    flex: 1;
    margin: -4px calc(var(--gap-0-5) * -1);
    padding: 4px var(--gap-0-5);
    border: none;
    border-radius: var(--border-raius);
    background: none;
    font-size: var(--font-size-bigger);
    font-weight: 600;

    &:focus {
      background: var(--color-bg-accent);
      outline: none;
    }
  }

  &__close {
    display: flex;
    align-items: center;
    margin-left: var(--gap);
  }

  &__legend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: var(--gap-1-5) 0 var(--gap-0-5);
    font-size: var(--font-size-big);
    font-weight: 500;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: var(--gap) 0;
  }

  &__action {
    display: flex;
    align-items: center;
    margin-left: var(--gap);

    &:first-child {
      margin-left: 0;
    }
  }

  &__label {
    margin-right: var(--gap-0-5);
    color: var(--color-text-secondary);
    font-size: var(--font-size-small);
  }

  &__description {
    position: relative;
    margin: calc(var(--gap) - 4px) calc(var(--gap-0-5) * -1) -4px;
    padding: 4px var(--gap-0-5);
    border-radius: var(--border-raius);

    &::before {
      content: attr(data-placeholder);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: inherit;
      opacity: 0.5;
      pointer-events: none;
    }

    &:focus {
      background: var(--color-bg-accent);
      outline: none;

      &::before {
        opacity: 0;
      }
    }
  }

  &__tasks {
    @extend %resetList;
    margin: var(--gap) 0 0;
  }
}
</style>
