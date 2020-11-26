<template>
  <div class="home">
    <div
      v-if="statuses && statuses.length > 0 && !isGenerating"
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
        I recommend that you generate a demo project, which shows the structure
        of the project in a rather informative way.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_STATUSES } from "@/store/modules/statuses/types";
import STATUSES from "@/assets/data/statuses";
import ISSUES from "@/assets/data/issues";

export default {
  name: "HomeView",

  computed: {
    ...mapGetters("statuses", {
      statuses: GET_STATUSES,
    }),
  },

  data() {
    return {
      isGenerating: false,
    };
  },

  created() {
    this.fetchStatuses();
  },

  methods: {
    ...mapActions("system", ["clearDB"]),
    ...mapActions("statuses", ["fetchStatuses", "saveStatus"]),
    ...mapActions("issues", ["saveIssue"]),
    ...mapActions("tasks", ["saveTask"]),

    async generate() {
      this.isGenerating = true;
      STATUSES.forEach((status, index) => {
        this.saveStatus({
          name: status,
          order: (index + 1) * 10,
        });
      });

      await this.fetchStatuses();

      for (const issue of ISSUES) {
        const issueStatus = this.statuses.find(
          (status) => status.name === issue.status
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
          statusId: issueStatus.id,
          progress: calculateProgress(issue.tasks),
          tasks,
        });
      }

      this.isGenerating = false;
      this.$router.push("/project");
    },

    async remove() {
      await this.clearDB();
      await this.fetchStatuses();
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
