<template>
  <article v-if="value" class="issue">
    <header class="issue__header">
      <input v-model="value.name" class="issue__title" @blur="save" />

      <ui-menu class="issue__menu">
        <ui-menu-title>Move to...</ui-menu-title>
        <ui-menu-item
          v-for="column in columns"
          :key="column.id"
          @click="changeStatus(column.id)"
        >
          {{ column.name }}
        </ui-menu-item>
        <ui-menu-title>Actions</ui-menu-title>
        <ui-menu-item @click="remove">Delete</ui-menu-item>
      </ui-menu>
    </header>

    <h3 class="issue__legend">Description</h3>
    <div
      class="issue__description"
      contenteditable
      @blur="handleDescriptionBlur"
      v-html="value.description"
    />

    <h3 class="issue__legend">
      Tasks
      <span class="issue__info">5/10</span>
      <ui-battery :progress="50" />
    </h3>
    <div class="issue__tasks">
      <div class="issue__space" />
      <template v-for="task in value.tasks">
        <div :key="task" class="issue__task">
          <Task :id="task" @delete="removeTask" />
        </div>
        <div :key="task + 'Space'" class="issue__space" />
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
import Task from "@/components/shared/Issue/Task";
import { clearText } from "@/libs/utils";

export default {
  name: "Issue",

  components: {
    Task,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      value: null,
    };
  },

  computed: {
    ...mapGetters("issues", {
      issue: GET_ISSUE_BY_ID,
    }),
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

  methods: {
    ...mapActions("issues", ["fetchIssues", "saveIssue", "deleteIssue"]),
    ...mapActions("tasks", ["fetchTasks", "saveTask", "deleteTask"]),

    async save() {
      await this.saveIssue(this.value);
    },

    async changeStatus(id) {
      await this.saveIssue({
        ...this.value,
        statusId: id,
      });
    },

    async handleDescriptionBlur(e) {
      const newText = clearText(e.target.innerHTML);
      if (newText === this.value.name) {
        return;
      }
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

      await this.saveIssue({
        ...this.value,
        tasks,
      });

      await this.fetchIssues();
    },

    async removeTask(id) {
      const index = this.value.tasks.findIndex((task) => task === id);
      this.value.tasks.splice(index, 1);
      await this.saveIssue(this.value);
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

  &__menu {
    margin: 0 -12px 0 var(--gap);
  }

  &__legend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: var(--gap-1-5) 0 var(--gap-0-5);
    font-size: var(--font-size-big);
    font-weight: 500;
  }

  &__info {
    margin: 0 var(--gap) 0 auto;
    color: var(--color-text-secondary);
  }

  &__description {
    margin: calc(var(--gap) - 4px) calc(var(--gap-0-5) * -1) -4px;
    padding: 4px var(--gap-0-5);
    border-radius: var(--border-raius);

    &:focus {
      background: var(--color-bg-accent);
      outline: none;
    }
  }

  &__tasks {
    @extend %resetList;
    margin: var(--gap) 0 0;
  }

  &__space {
    height: 4px;
  }
}
</style>
