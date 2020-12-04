<template>
  <div class="home">
    <div
      v-if="tracks && tracks.length > 0 && !isGenerating"
      class="home__options"
    >
      <ui-button size="large" type="primary" to="/project">
        Open project
      </ui-button>

      <br />

      <ui-button size="big" type="danger" @click="remove">
        Delete project
      </ui-button>
    </div>

    <div v-else class="home__options">
      <ui-button size="large" type="success" @click="generate">
        Generate Demo Project
      </ui-button>
      <ui-button size="large" type="primary" outlined to="/project">
        Open empty project
      </ui-button>

      <p>
        All issues (and tasks in popups) in the demo project are real for this
        challenge. Here you can see what has already been done, what is in
        progress, and what I will probably finish later.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_TRACKS } from "@/store/modules/tracks/types";
import TRACKS from "@/assets/data/tracks";
import ISSUES from "@/assets/data/issues";

export default {
  name: "HomeView",

  computed: {
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
    ...mapActions("issues", ["saveIssue"]),
    ...mapActions("tasks", ["saveTask"]),

    async generate() {
      this.isGenerating = true;
      TRACKS.forEach((track, index) => {
        this.saveTrack({
          name: track,
          order: (index + 1) * 10,
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

      this.isGenerating = false;
      this.$router.push("/project");
    },

    async remove() {
      await this.clearDB();
      await this.fetchTracks();
    },
  },

  metaInfo: {
    title: "Homepage",
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

<style lang="scss">
$block: ".home";

#{$block} {
  display: flex;
  align-items: center;
  justify-content: center;

  &__options {
    text-align: center;

    .ui-button {
      width: 240px;
      margin: var(--gap-0-5);
    }

    p {
      max-width: 520px;
      margin: 40px auto 0;
      color: var(--color-text-secondary);
      font-size: var(--font-size-bigger);
      line-height: 1.6;
    }
  }
}
</style>
