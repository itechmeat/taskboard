<template>
  <div class="layout">
    <TheHeader />

    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheHeader from "@/components/shared/TheHeader";
import config from "@/app.config";

export default {
  components: {
    TheHeader,
  },

  created() {
    this.fetchTracks();
    this.fetchIssues();
    this.fetchTasks();
  },

  methods: {
    ...mapActions("tracks", ["fetchTracks"]),
    ...mapActions("issues", ["fetchIssues"]),
    ...mapActions("tasks", ["fetchTasks"]),
  },

  metaInfo() {
    let result = [
      { charset: "utf-8" },
      { property: "og:type", content: "website" },
    ];

    if (config) {
      if (config.projectName) {
        let title = config.projectName;

        if (config.titleAppend) {
          title = title + config.titleAppend;
        }

        result = [
          ...result,
          { hid: "og:title", property: "og:title", content: title },
          {
            hid: "itemprop:name",
            itemprop: "name",
            content: config.projectName,
          },
          { property: "og:site:name", content: config.projectName },
          { hid: "twitter:title", name: "twitter:title", content: title },
        ];
      }

      if (config.description) {
        const description = config.description;

        result = [
          ...result,
          { hid: "description", name: "description", content: description },
          {
            hid: "og:description",
            property: "og:description",
            content: description,
          },
          {
            hid: "itemprop:description",
            itemprop: "description",
            content: description,
          },
          {
            hid: "twitter:description",
            name: "twitter:description",
            content: description,
          },
        ];
      }

      if (config.image && config.website) {
        const image = config.website + config.image;

        result = [
          ...result,
          { hid: "og:image", property: "og:image", content: image },
          {
            hid: "og:image:height",
            property: "og:image:height",
            content: 628,
          },
          {
            hid: "og:image:width",
            property: "og:image:width",
            content: 1200,
          },
          { hid: "itemprop:image", itemprop: "image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { hid: "twitter:image", name: "twitter:image", content: image },
        ];
      }

      if (config.twitterName) {
        result = [
          ...result,
          { name: "twitter:site", content: config.twitterName },
        ];
      }

      if (config.keywords) {
        result = [
          ...result,
          { vmid: "keywords", name: "keywords", content: config.keywords },
        ];
      }
    }

    return {
      title: config.projectName,
      meta: result,
    };
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
