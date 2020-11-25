<template>
  <article class="issue">
    <header class="issue__header">
      <h2 class="issue__title" contenteditable>Some Title</h2>

      <ui-menu class="issue__menu" title="Move to...">
        <ui-menu-item
          v-for="column in columns"
          :key="column.id"
          @click="changeStatus(column.id)"
        >
          {{ column.name }}
        </ui-menu-item>
      </ui-menu>
    </header>

    <h3 class="issue__legend">Description</h3>
    <div class="issue__description" contenteditable>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>

    <h3 class="issue__legend">
      Tasks
      <span class="issue__info">5/10</span>
      <ui-battery :progress="50" />
    </h3>
    <ul class="issue__tasks">
      <li v-for="task in 10" :key="task" class="issue__task">
        Task {{ task }}
      </li>
      <li class="issue__task">
        <ui-button
          expanded
          type="clear"
          class="ui-menu__control"
          @click="addTask"
        >
          Add another task
        </ui-button>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: "Issue",

  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    addTask() {
      console.log("addTask");
    },

    changeStatus(id) {
      console.log(id);
    },
  },
};
</script>

<style lang="scss" scoped>
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
    border-radius: var(--border-raius);
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

  &__task {
    &:not(:first-child) {
      margin-top: var(--gap-0-5);
    }
  }
}
</style>
