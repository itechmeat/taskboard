<template>
  <main class="feed">
    <div class="feed__list">
      <template v-for="issue in issues">
        <FeedCard
          :key="issue.id"
          :value="issue"
          :active="issue.id === visibleIssueId"
        />
      </template>
    </div>

    <div class="feed__aside">
      <Issue
        v-if="visibleIssueId"
        :id="visibleIssueId"
        :tracks="tracks"
        can-close
        @close="closeIssue"
      />

      <div v-else>
        <ui-button type="primary" @click="addIssue">Add new Issue</ui-button>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { SET_CURRENT_PROJECT } from "@/store/modules/projects/types";
import { GET_TRACKS } from "@/store/modules/tracks/types";
import { GET_ISSUES } from "@/store/modules/issues/types";
import FeedCard from "@/components/shared/Feed/Card";
import Issue from "@/components/shared/Issue";

export default {
  name: "Feed",

  components: {
    FeedCard,
    Issue,
  },

  data() {
    return {
      visibleIssueId: null,
    };
  },

  computed: {
    ...mapGetters("tracks", {
      tracks: GET_TRACKS,
    }),
    ...mapGetters("issues", {
      issues: GET_ISSUES,
    }),
  },

  watch: {
    "$route.params.project": {
      immediate: true,
      handler(val) {
        if (!val) {
          return;
        }
        this.setProject(val);
      },
    },

    "$route.params.issue": {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val) {
          this.visibleIssueId = null;
          return;
        }
        this.visibleIssueId = val;
      },
    },
  },

  methods: {
    ...mapMutations("projects", {
      setProject: SET_CURRENT_PROJECT,
    }),
    ...mapActions("issues", ["saveIssue"]),

    closeIssue() {
      this.$router.push(`/projects/${this.$route.params.project}/feed/`);
    },

    async addIssue() {
      const name = prompt("Name of the Issue", "New Issue");

      let trackId = null;

      if (this.tracks && this.tracks.length > 0) {
        trackId = this.tracks[0].id;
      }

      const newIssueId = await this.saveIssue({
        name,
        description: "",
        trackId,
        oldTrackId: trackId,
        tasks: [],
        order: this.issues.length * 10,
        progress: 0,
        estimate: 0,
        projectId: this.$route.params.project,
      });

      if (newIssueId) {
        this.$router.push(
          `/projects/${this.$route.params.project}/feed/${newIssueId}`
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".feed";

#{$block} {
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  max-height: 100%;
  padding: var(--gap);

  @include display-less(desktop) {
    flex-direction: column-reverse;
  }

  &__list {
    flex: 0 0 400px;
    max-width: 800px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-raius);

    @include display-less(desktop) {
      flex: 0 0 auto;
      width: 100%;
    }
  }

  &__aside {
    flex: 0 0 560px;
    position: sticky;
    top: 0;
    margin: 0 0 0 var(--gap);
    padding: var(--gap) var(--gap-1-5);
    border: 1px solid var(--color-border);
    border-radius: var(--border-raius);
    background: var(--color-light);

    @include display-less(desktop) {
      flex: 0 0 auto;
      position: static;
      width: 100%;
      margin: 0 0 var(--gap);
    }
  }

  &__issue {
    margin: var(--gap) 0;
    padding: var(--gap) var(--gap-2);
    border: 1px solid var(--color-border);
    border-radius: var(--border-raius);
    background: var(--color-light);
  }
}
</style>
