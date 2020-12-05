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
import { mapGetters, mapActions } from "vuex";
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
    "$route.params": {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val || !val.id) {
          this.visibleIssueId = null;
          return;
        }
        this.visibleIssueId = val.id;
      },
    },
  },

  methods: {
    ...mapActions("issues", ["saveIssue"]),

    closeIssue() {
      this.$router.push("/projects/demo/feed");
    },

    addIssue() {
      const name = prompt("Name of the Issue", "New Issue");

      let trackId = null;

      if (this.tracks && this.tracks.length > 0) {
        trackId = this.tracks[0].id;
      }

      this.saveIssue({
        name,
        description: "",
        trackId,
        tasks: [],
        order: this.issues.length * 10,
      });
    },
  },
};
</script>

<style lang="scss">
$block: ".feed";

#{$block} {
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  max-height: 100%;
  padding: var(--gap);

  &__list {
    flex: 0 0 400px;
    max-width: 800px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-raius);
  }

  &__aside {
    flex: 0 0 560px;
    position: sticky;
    top: 0;
    min-height: 300px;
    margin: 0 0 0 var(--gap);
    padding: var(--gap) var(--gap-1-5);
    border: 1px solid var(--color-border);
    border-radius: var(--border-raius);
    background: var(--color-light);
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
