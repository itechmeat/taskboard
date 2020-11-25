<template>
  <div class="task" :class="{ task_open: isOpen }">
    <div class="task__main">
      <div class="task__handler"></div>
      <div class="task__check">
        <input v-model="isDone" type="checkbox" />
      </div>
      <div class="task__name" contenteditable>Task</div>
      <div class="task__progress" :class="{ task__progress_hidden: isDone }">
        {{ progress }}%
      </div>
      <div class="task__actions">
        <button class="task__control" @click="isOpen = !isOpen" />
      </div>
    </div>

    <div class="task__data">
      <div class="task__info">
        <ui-button type="clear" size="tiny" @click="remove"
          >Remove this task</ui-button
        >
      </div>
      <div class="task__progressor">
        <input
          v-model="progress"
          :disabled="isDone"
          class="task__range"
          type="range"
          min="0"
          max="100"
          step="1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IssueTask",

  data() {
    return {
      isOpen: false,
      isDone: false,
      progress: 40,
    };
  },

  methods: {
    remove() {
      console.log("remove");
    },
  },
};
</script>

<style lang="scss" scoped>
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
    border-radius: var(--border-raius);

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
