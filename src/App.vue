<template>
  <div class="layout">
    <TheHeader />

    <router-view />
  </div>
</template>

<script>
import TheHeader from "@/components/shared/TheHeader";

export default {
  components: {
    TheHeader,
  },

  metaInfo: {
    title: "Just another task tracker",
    titleTemplate: "%s | TaskBoard",
    meta: [
      { charset: "utf-8" },
      {
        vmid: "description",
        name: "description",
        content: "Just another task tracker",
      },
    ],
  },
};
</script>

<style lang="scss">
@import "@/styles/main";

.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>
