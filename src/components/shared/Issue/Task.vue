<template>
  <div v-if="value" :data-task="index" :draggable="canDrag" class="task">
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

      <div class="task__estimate">
        <ui-time
          :value="value.estimate || 0"
          can-change
          @change="changeEstimate"
        />
      </div>

      <div class="task__actions">
        <ui-menu>
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
import { mapGetters, mapActions } from "vuex";
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
    ...mapGetters("tasks", {
      task: GET_TASK_BY_ID,
    }),
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
  },

  methods: {
    ...mapActions("tasks", ["fetchTasks", "saveTask", "deleteTask"]),

    async fillTask(val) {
      const id = val || this.id;
      let task = this.task(id);

      if (!task) {
        await this.fetchTasks();
        task = this.task(id);
      }

      this.value = task;
    },

    focus() {
      this.canDrag = false;
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
  margin: 0 -20px 0 -20px;
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
      margin: 0;
      vertical-align: bottom;
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
  }

  &__estimate {
    flex: 0 0 auto;
  }

  &__actions {
    margin-left: -4px;
  }
}
</style>
