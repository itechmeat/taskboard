<template>
  <div class="projects">
    <Generator />
  </div>
</template>

<script>
import Generator from "@/components/shared/Generator";

export default {
  name: "ProjectsView",

  components: {
    Generator,
  },

  metaInfo: {
    title: "Projects list",
  },
};
</script>

<style lang="scss">
$block: ".projects";

#{$block} {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gap);
}
</style>
