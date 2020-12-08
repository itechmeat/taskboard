<template>
  <router-link
    v-if="value"
    class="board-card"
    :to="`/projects/${this.$route.params.project}/board/${value.id}`"
    :draggable="canDrag"
    :data-issue="index"
  >
    <div class="board-card__label">{{ value.name }}</div>
    <ui-battery :progress="value.progress" />
  </router-link>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_ISSUE_BY_ID } from "@/store/modules/issues/types";
import { GET_TASK_BY_ID } from "@/store/modules/tasks/types";

export default {
  name: "BoardCard",

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
    ...mapGetters("issues", {
      issue: GET_ISSUE_BY_ID,
    }),
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
    ...mapActions("issues", ["fetchIssues"]),
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".board-card";

#{$block} {
  & {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: var(--gap) var(--gap-0-5);
    border-radius: var(--border-raius);
    background: var(--color-light);
    box-shadow: 0 2px 0 -1px rgba(#000, 0.1);
    font-size: var(--font-size-base);
    text-decoration: none;
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
    will-change: transform, box-shadow;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 2px 1px rgba(#000, 0.1);
    }
  }

  &__label {
    margin-right: var(--gap);
  }
}
</style>
