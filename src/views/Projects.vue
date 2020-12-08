<template>
  <div class="projects">
    <template v-if="projects && projects.length > 0">
      <ul v-for="project in projects" :key="project.id" class="projects__list">
        <li class="projects__item">
          <router-link :to="'/projects/' + project.id" class="projects__link">
            {{ project.name }}
          </router-link>

          <div class="projects__action">
            <ui-button
              type="danger"
              size="tiny"
              @click="deleteProject(project.id)"
            >
              <i class="mdi mdi-18px mdi-delete"></i>
            </ui-button>
          </div>
        </li>
      </ul>
    </template>

    <Generator v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_PROJECTS } from "@/store/modules/projects/types";
import Generator from "@/components/shared/Generator";

export default {
  name: "ProjectsView",

  components: {
    Generator,
  },

  computed: {
    ...mapGetters("projects", {
      projects: GET_PROJECTS,
    }),
  },

  methods: {
    ...mapActions("projects", ["deleteProject"]),
  },

  metaInfo: {
    title: "Projects list",
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".projects";

#{$block} {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gap);

  &__list {
    @extend %resetList;

    width: 300px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-raius);
    background: var(--color-light);
  }

  &__item {
    position: relative;

    &:not(:first-child) {
      border-top: 1px solid var(--color-border);
    }
  }

  &__link {
    display: block;
    padding: var(--gap);
    text-decoration: none;
  }

  &__action {
    position: absolute;
    top: 50%;
    right: var(--gap);
    transform: translateY(-50%);
  }
}
</style>
