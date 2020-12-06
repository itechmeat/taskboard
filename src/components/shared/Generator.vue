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

      <div v-if="false" class="generator__option">
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

      let order = 10;

      for (const issue of ISSUES) {
        const issueTrack = this.tracks.find(
          (track) => track.name === issue.track
        );
        const tasks = [];

        if (issue.tasks.length > 0) {
          for (const task of issue.tasks) {
            const taskId = await this.saveTask({
              name: task.name,
              estimate: task.estimate,
              isDone: task.isDone,
            });
            tasks.push(taskId);
          }
        }

        await this.saveIssue({
          name: issue.name,
          description: issue.description,
          trackId: issueTrack.id,
          estimate: issue.tasks.reduce((a, b) => a + b.estimate, 0),
          progress: calculateProgress(issue.tasks),
          order: order,
          tasks,
        });

        order += 10;
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
      await this.fetchIssues();
      await this.fetchTracks();
    },
  },
};

function calculateProgress(tasks) {
  let completedTasks = 0;

  tasks.forEach((task) => {
    if (task) {
      if (task.isDone) {
        completedTasks++;
      }
    }
  });

  return Math.ceil(completedTasks * 100) / tasks.length;
}
</script>

<style lang="scss">
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
