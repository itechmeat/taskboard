<template>
  <div class="layout">
    <TheHeader />

    <router-view />

    <notifications group="api" />

    <ui-modal :visible="!!popup" @close="closeModal">
      <component
        v-if="popup"
        :is="popup"
        @redirect="handleChangePopup"
        @close="handleChangePopup(false)"
      />
    </ui-modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { GET_POPUP, SET_POPUP } from "@/store/modules/content/types";
import TheHeader from "@/components/shared/TheHeader";
import Login from "@/components/shared/Auth/Login";
import SignUp from "@/components/shared/Auth/SignUp";
import Forgot from "@/components/shared/Auth/Forgot";
import ChangePassword from "@/components/shared/Auth/ChangePassword";
import config from "@/app.config";

export default {
  name: "App",

  components: {
    TheHeader,
    Login,
    SignUp,
    Forgot,
    ChangePassword,
  },

  created() {
    this.authRequest();
    this.fetchProjects();
    this.fetchTracks();
    this.fetchIssues();
    this.fetchTasks();
  },

  computed: {
    ...mapGetters("content", {
      popup: GET_POPUP,
    }),
  },

  methods: {
    ...mapActions("user", ["authRequest"]),
    ...mapActions("projects", ["fetchProjects"]),
    ...mapActions("tracks", ["fetchTracks"]),
    ...mapActions("issues", ["fetchIssues"]),
    ...mapActions("tasks", ["fetchTasks"]),
    ...mapMutations("content", {
      setPopup: SET_POPUP,
    }),

    handleChangePopup(val) {
      this.setPopup(val);
    },

    closeModal() {
      this.setPopup();
    },
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
