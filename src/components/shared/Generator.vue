<template>
  <div class="generator">
    <div
      v-if="tracks && tracks.length > 0 && !isGenerating"
      class="generator__options"
    >
      <div class="generator__option">
        <ui-button
          size="large"
          type="primary"
          to="/projects/demo/feed"
          expanded
        >
          Open project
        </ui-button>
      </div>

      <div class="generator__option">
        <ui-button size="big" type="danger" expanded @click="remove">
          Delete project
        </ui-button>
      </div>
    </div>

    <div v-else class="home__options">
      <div class="generator__option">
        <ui-button size="large" type="success" expanded @click="generate">
          Generate Demo Project
        </ui-button>
      </div>

      <div class="generator__option">
        <ui-button
          size="large"
          type="primary"
          outlined
          expanded
          to="/projects/demo/feed"
        >
          Open empty project
        </ui-button>
      </div>

      <p class="generator__note">
        All issues (and tasks in popups) in the demo project are real for this
        challenge. Here you can see what has already been done, what is in
        progress, and what I will probably finish later.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_ISSUES } from "@/store/modules/issues/types";
import { GET_TRACKS } from "@/store/modules/tracks/types";
import TRACKS from "@/assets/data/tracks";
import ISSUES from "@/assets/data/issues";

export default {
  name: "Generator",

  computed: {
    ...mapGetters("issues", {
      issues: GET_ISSUES,
    }),
    ...mapGetters("tracks", {
      tracks: GET_TRACKS,
    }),
  },

  data() {
    return {
      isGenerating: false,
    };
  },

  created() {
    this.fetchTracks();
  },

  methods: {
    ...mapActions("system", ["clearDB"]),
    ...mapActions("tracks", ["fetchTracks", "saveTrack"]),
    ...mapActions("issues", ["fetchIssues", "saveIssue"]),
    ...mapActions("tasks", ["saveTask"]),

    async generate() {
      this.isGenerating = true;
      TRACKS.forEach((track, index) => {
        this.saveTrack({
          name: track,
          order: (index + 1) * 10,
          issues: [],
        });
      });

      await this.fetchTracks();

      for (const issue of ISSUES) {
        const issueTrack = this.tracks.find(
          (track) => track.name === issue.track
        );
        const tasks = [];

        if (issue.tasks.length > 0) {
          for (const task of issue.tasks) {
            const taskId = await this.saveTask({
              name: task.name,
              progress: task.progress,
              isDone: task.isDone,
            });
            tasks.push(taskId);
          }
        }

        await this.saveIssue({
          name: issue.name,
          description: issue.description,
          trackId: issueTrack.id,
          progress: calculateProgress(issue.tasks),
          tasks,
        });
      }

      await this.fetchIssues();

      for (const track of this.tracks) {
        const trackIssues = this.issues.filter(
          (issue) => issue.trackId === track.id
        );
        await this.saveTrack({
          ...track,
          issues: trackIssues.map((issue) => issue.id),
        });
      }

      this.isGenerating = false;
      this.$router.push("/projects/demo/feed");
    },

    async remove() {
      await this.clearDB();
      await this.fetchTracks();
    },
  },
};

function calculateProgress(tasks) {
  const progressList = [];

  tasks.forEach((task) => {
    if (task) {
      if (task.isDone) {
        progressList.push(100);
        return;
      }
      progressList.push(Number(task.progress) || 0);
    }
  });

  const sum = progressList.reduce((a, b) => a + b, 0);

  return Math.ceil((sum / progressList.length) * 100) / 100;
}
</script>

<style lang="scss" scoped>
$block: ".generator";

#{$block} {
  min-width: 240px;
  text-align: center;

  &__option {
    &:not(:first-child) {
      margin-top: var(--gap);
    }
  }

  &__note {
    max-width: 520px;
    margin: 40px auto 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-bigger);
    line-height: 1.6;
  }
}
</style>
