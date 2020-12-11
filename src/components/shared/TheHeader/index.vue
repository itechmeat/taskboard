<template>
  <header class="header">
    <router-link to="/" class="header__brand">
      <span class="header__name">estim8.</span>
      <span class="header__ext">work</span>
    </router-link>

    <div class="space" />

    <template v-if="user">
      <div v-if="ms" class="header__timer">
        {{ hours }}:{{ minutes }}:{{ seconds }}
      </div>

      <div v-else class="header__estimation">
        <span v-if="project">Evaluation of the {{ project.name }}</span>
        <span v-else>Evaluation</span>
        <ui-time :value="issuesEstimate || 0" />
      </div>

      <div class="space" />
    </template>

    <div v-if="isModeVisible" class="header__mode">
      <ui-switcher
        v-model="isBoard"
        label-before="Feed"
        label-after="Board"
        transparent
        @change="switchMode"
      />
    </div>

    <User />
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { GET_PROJECT_BY_ID } from "@/store/modules/projects/types";
import { GET_ISSUES_ESTIMATE } from "@/store/modules/issues/types";
import { GET_STARTED_TASK_TIME } from "@/store/modules/tasks/types";
import { GET_USER } from "@/store/modules/user/types";
import User from "@/components/shared/TheHeader/User";

export default {
  name: "Header",

  components: {
    User,
  },

  data() {
    return {
      isBoard: false,
      ms: null,
    };
  },

  computed: {
    ...mapState("tasks", ["startedTaskId"]),
    ...mapGetters("user", {
      user: GET_USER,
    }),
    ...mapGetters("projects", {
      currentProject: GET_PROJECT_BY_ID,
    }),
    ...mapGetters("issues", {
      issuesEstimate: GET_ISSUES_ESTIMATE,
    }),
    ...mapGetters("tasks", {
      startedTaskTime: GET_STARTED_TASK_TIME,
    }),

    project() {
      if (!this.$route.params.project) {
        return;
      }
      return this.currentProject(this.$route.params.project);
    },

    seconds() {
      return this.countTime(1000, 60);
    },

    minutes() {
      return this.countTime(1000 * 60, 60);
    },

    hours() {
      return this.countTime(1000 * 60 * 60, 24);
    },

    isModeVisible() {
      return (
        this.$route.name === "ProjectFeed" ||
        this.$route.name === "ProjectFeedCard" ||
        this.$route.name === "ProjectBoard" ||
        this.$route.name === "ProjectBoardCard"
      );
    },
  },

  mounted() {
    this.isBoard = this.$route.name === "ProjectBoard";
  },

  watch: {
    startedTaskTime: {
      immediate: true,
      handler() {
        this.setTime();
      },
    },
  },

  methods: {
    setTime() {
      if (!this.startedTaskTime) {
        this.ms = null;
        return;
      }

      this.ms = Date.now() - this.startedTaskTime;

      setTimeout(() => {
        this.setTime();
      }, 1000);
    },

    countTime(divider, surplus) {
      if (!this.ms) {
        return;
      }
      let result = "" + Math.floor((this.ms / divider) % surplus);
      if (result.length === 1) {
        result = "0" + result;
      }
      return result;
    },

    switchMode() {
      this.isBoard = !this.isBoard;
      let mode = "feed";
      if (this.isBoard) {
        mode = "board";
      }
      if (
        (this.$route.name === "ProjectFeed" && !this.isBoard) ||
        (this.$route.name === "ProjectBoard" && this.isBoard)
      ) {
        return;
      }
      this.$router.push(`/projects/${this.$route.params.project}/${mode}`);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".header";

#{$block} {
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 var(--gap);
    background: var(--color-primary);
    box-shadow: 0 4px 16px rgba($colorShadow, 0.2);
    color: var(--color-light);
  }

  &__brand {
    margin: 0 var(--gap-2) 0 0;
    font-family: var(--font-family-brand);
    font-size: var(--font-size-legend);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;

    &,
    &:hover {
      color: var(--color-light);
    }
  }

  &__name {
    display: block;
  }

  &__ext {
    display: block;
    margin: -8px 0 0 49px;
  }

  &__mode {
    flex: 0 0 auto;
  }

  &__estimation {
    display: flex;
    align-items: center;

    span {
      margin-right: var(--gap-0-5);

      @include display-less(desktop) {
        display: none;
      }
    }
  }

  &__timer {
    font-family: "JetBrains Mono", monospace;
    font-size: var(--font-size-large);
  }
}
</style>
