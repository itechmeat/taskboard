<template>
  <div
    v-if="value"
    :data-task="index"
    :class="{ task_open: isOpen }"
    :draggable="canDrag"
    class="task"
  >
    <div class="task__main">
      <div class="task__handler"></div>
      <div class="task__check">
        <input v-model="value.isDone" type="checkbox" @change="save" />
      </div>
      <input
        v-model="value.name"
        class="task__name"
        @focus="focus"
        @blur="save"
      />
      <div
        class="task__progress"
        :class="{ task__progress_hidden: value.isDone }"
      >
        {{ value.progress }}%
      </div>
      <div class="task__actions">
        <button class="task__control" @click="isOpen = !isOpen" />
      </div>
    </div>

    <div class="task__data">
      <div class="task__info">
        <ui-button type="clear" size="tiny" @click="remove">
          Remove this task
        </ui-button>
      </div>
      <div class="task__progressor">
        <input
          v-model="value.progress"
          :disabled="value.isDone"
          class="task__range"
          type="range"
          min="0"
          max="100"
          step="1"
          @change="save"
        />
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
      isOpen: false,
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
      async handler(val) {
        if (!val) {
          return;
        }

        let issue = this.task(val);

        if (!issue) {
          await this.fetchTasks();
          issue = this.task(val);
        }

        this.value = issue;
      },
    },
  },

  methods: {
    ...mapActions("tasks", ["fetchTasks", "saveTask", "deleteTask"]),

    focus() {
      this.canDrag = false;
    },

    async save() {
      await this.saveTask(this.value);
      this.$emit("update");
      this.canDrag = true;
    },

    async remove() {
      await this.deleteTask(this.id);
      this.$emit("delete", this.id);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".task";

#{$block} {
  margin: 0 -4px 0 -20px;
  padding: 4px;
  border-radius: var(--border-raius);

  &:hover,
  &:focus-within {
    background: var(--color-bg);
  }

  &_open,
  &_open:focus-within {
    background: var(--color-bg-accent);
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

  &__progress {
    &_hidden {
      visibility: hidden;
    }
  }

  &__control {
    @extend %resetButton;
    position: relative;
    width: var(--gap-1-5);
    height: var(--gap-1-5);
    border-radius: 50%;
    vertical-align: bottom;
    outline: none;
    transform: rotate(-90deg);
    transition: transform 0.2s;
    will-change: transform;

    &:hover {
      background: rgba(#000, 0.1);
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 5px;
      width: 8px;
      height: 2px;
      border-radius: 2px;
      background: var(--color-border);
      transform: rotate(45deg);
    }

    &::after {
      transform: translateX(5px) rotate(-45deg);
    }

    #{$block}_open & {
      transform: rotate(0);
    }
  }

  &__data {
    display: none;
    margin: 4px 4px 2px 30px;

    #{$block}_open & {
      display: flex;
    }
  }

  &__info {
    flex: 1;
  }

  &__progressor {
    flex: 0 0 auto;
    margin-left: var(--gap);
  }

  &__range {
    width: 100px;
  }
}
</style>
