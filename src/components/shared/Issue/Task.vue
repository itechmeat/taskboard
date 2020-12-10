<template>
  <div
    v-if="value"
    :data-task="index"
    :draggable="canDrag"
    :class="['task', { task_started: isStarted }]"
  >
    <div class="task__main">
      <div class="task__handler"></div>
      <div class="task__check">
        <input v-model="value.isDone" type="checkbox" @change="save" />
      </div>
      <input
        v-model="value.name"
        class="task__name"
        placeholder="Enter name of the task"
        @focus="focus"
        @blur="save"
      />

      <div class="task__time">
        <div class="task__estimate">
          <ui-time
            :value="value.estimate || 0"
            type="primary"
            can-change
            @change="changeEstimate"
          />
        </div>

        <div v-if="totalSpentTime" class="task__spent">
          <ui-time :value="totalSpentTime" />
        </div>
      </div>

      <div class="task__actions">
        <ui-button
          v-if="isStarted"
          type="clear"
          size="tiny"
          icon-position="center"
          rounded
          @click="pause"
        >
          <i class="mdi mdi-pause"></i>
        </ui-button>

        <ui-button
          v-else
          type="clear"
          size="tiny"
          icon-position="center"
          rounded
          @click="start"
        >
          <i class="mdi mdi-play"></i>
        </ui-button>

        <ui-menu rounded size="tiny">
          <ui-menu-item v-if="!value.isDone" @click="complete">
            Mark as complete
          </ui-menu-item>
          <ui-menu-item v-if="value.isDone" @click="incomplete">
            Mark as incomplete
          </ui-menu-item>
          <ui-menu-item @click="remove">Delete</ui-menu-item>
        </ui-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { GET_TASK_BY_ID } from "@/store/modules/tasks/types";

export default {
  name: "IssueTask",

  props: {
    id: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      value: null,
      canDrag: true,
    };
  },

  computed: {
    ...mapState("tasks", ["startedTaskId"]),
    ...mapGetters("tasks", {
      task: GET_TASK_BY_ID,
    }),

    storedTask() {
      if (!this.id) {
        return;
      }
      return this.task(this.id);
    },

    totalSpentTime() {
      if (!this.value || !this.value.times) {
        return;
      }
      return this.value.times.reduce((acc, time) => acc + time.seconds, 0);
    },

    isStarted() {
      if (!this.startedTaskId || !this.value) {
        return;
      }
      return this.startedTaskId === this.value.id;
    },
  },

  watch: {
    id: {
      immediate: true,
      handler(val) {
        if (!val) {
          return;
        }

        this.fillTask(val);
      },
    },

    storedTask: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val) {
          return;
        }

        this.fillTask(val);
      },
    },
  },

  methods: {
    ...mapActions("tasks", [
      "fetchTasks",
      "saveTask",
      "deleteTask",
      "startTask",
      "pauseTask",
    ]),

    async fillTask() {
      let task = this.storedTask;

      if (!task) {
        await this.fetchTasks();
        task = this.storedTask;
      }

      this.value = task;
    },

    focus() {
      this.canDrag = false;
    },

    start() {
      this.startTask(this.value.id);
    },

    pause() {
      this.pauseTask();
    },

    async save() {
      await this.saveTask(this.value);
      this.canDrag = true;
      this.$nextTick(() => {
        this.$emit("update");
      });
    },

    complete() {
      this.value.isDone = true;
      this.save();
    },

    incomplete() {
      this.value.isDone = false;
      this.save();
    },

    async changeEstimate(val) {
      // TODO: Add validation
      this.value.estimate = val;
      await this.save();
      await this.fillTask();
    },

    async remove() {
      await this.deleteTask(this.id);
      this.$emit("delete", this.id);
    },
  },
};
</script>

<style lang="scss">
$block: ".task";

#{$block} {
  margin: 0 -20px;
  padding: 4px;
  border-radius: var(--border-raius);

  &:hover,
  &:focus-within {
    background: var(--color-bg);
  }

  &__main {
    display: grid;
    grid-template-columns: auto auto 1fr auto auto;
    grid-gap: var(--gap-0-5);
    align-items: center;
    justify-content: space-between;
  }

  &__handler {
    width: 9px;
    height: 15px;
    border: dotted var(--color-border);
    border-width: 0 3px;
    opacity: 0;
    cursor: move;

    #{$block}:hover &,
    #{$block}:focus-within & {
      opacity: 1;
    }
  }

  &__check {
    input {
      margin: 1px 0 0;
      vertical-align: top;
    }
  }

  &__name {
    margin: 0 -4px;
    padding: 4px;
    border: none;
    border-radius: var(--border-raius);
    background: none;

    &:focus {
      background: var(--color-bg-accent);
      outline: none;
    }

    #{$block}_started & {
      color: var(--color-primary);
    }
  }

  &__time {
    display: flex;
    align-items: center;
  }

  &__estimate {
    flex: 0 0 auto;
  }

  &__spent {
    margin-left: 2px;
    padding-left: 2px;
    border-left: 1px solid var(--color-border);
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-left: -4px;

    .mdi {
      font-size: 14px;
      color: var(--color-text-secondary);
    }
  }
}
</style>
