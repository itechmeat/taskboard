<template>
  <div class="home">
    <div v-if="statuses && statuses.length > 0">
      <ui-button size="large" type="primary" to="/project">
        Open project
      </ui-button>
    </div>

    <div v-else class="home__options">
      <ui-button size="large" type="success" @click="generate">
        Generate Demo
      </ui-button>
      <ui-button size="large" type="primary" outlined to="/project">
        Open empty project
      </ui-button>
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

  created() {
    this.fetchStatuses();
  },

  methods: {
    ...mapActions("statuses", ["fetchStatuses", "saveStatus"]),
    ...mapActions("issues", ["saveIssue"]),
    ...mapActions("tasks", ["saveTask"]),

    async generate() {
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

      this.$router.push("/project");
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
    display: flex;

    .ui-button {
      width: 240px;
      margin: var(--gap-0-5);
    }
  }
}
</style>
