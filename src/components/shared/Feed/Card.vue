<template>
  <router-link
    v-if="value"
    :class="[
      'feed-card',
      { 'feed-card_active': active },
      { 'feed-card_started': isStarted },
    ]"
    :to="`/projects/${$route.params.project}/feed/${value.id}`"
  >
    <ui-record v-if="isStarted" class="feed-card__record" />

    <ui-battery v-else :progress="value.progress" />

    <div class="feed-card__label">{{ value.name }}</div>

    <ui-time :value="value.estimate || 0" type="primary" />

    <div class="feed-card__arrow">
      <div class="task__control" />
    </div>
  </router-link>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "FeedCard",

  props: {
    value: {
      type: Object,
      required: true,
    },
    active: Boolean,
  },

  data() {
    return {
      canDrag: true,
    };
  },

  computed: {
    ...mapState("tasks", ["startedTaskId"]),

    isStarted() {
      if (!this.value) {
        return;
      }
      return this.value.tasks.includes(this.startedTaskId);
    },
  },

  methods: {
    ...mapActions("issues", ["fetchIssues"]),
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".feed-card";

#{$block} {
  & {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: var(--gap);
    background: var(--color-light);
    font-size: var(--font-size-base);
    text-decoration: none;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border);
    }

    &:first-child {
      border-radius: var(--border-raius) var(--border-raius) 0 0;
    }

    &:last-child {
      border-radius: 0 0 var(--border-raius) var(--border-raius);
    }

    &:hover {
      background: var(--color-bg);
    }

    &_active,
    &_active:hover {
      background: var(--color-bg-accent);
    }

    &_started,
    &_started:hover {
      color: var(--color-primary);
    }
  }

  &__label {
    flex: 1;
    margin-left: var(--gap-0-5);
  }

  &__record {
    margin-right: 4px;
  }
}
</style>
