<template>
  <router-link
    v-if="value"
    :class="['feed-card', { 'feed-card_active': active }]"
    :to="`/projects/${$route.params.project}/feed/${value.id}`"
  >
    <ui-battery :progress="value.progress" />

    <div class="feed-card__label">{{ value.name }}</div>

    <ui-time :value="value.estimate || 0" />

    <div class="feed-card__arrow">
      <div class="task__control" />
    </div>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";

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
  }

  &__label {
    flex: 1;
    margin-left: var(--gap-0-5);
  }
}
</style>
