<template>
  <div class="header-user">
    <ui-menu v-if="user" type="primary">
      <div slot="content" class="header-user__content">
        <ui-avatar rounded :size="32" class="header-user__avatar" />
        <span class="header-user__name">Profile</span>
      </div>

      <ui-menu-item to="/projects">My Projects</ui-menu-item>
      <ui-menu-item @click="sendLogout">Logout</ui-menu-item>
    </ui-menu>

    <div v-else class="header-user__actions">
      <ui-button type="primary" @click="setPopup('login')">Log In</ui-button>
      <ui-button type="success" @click="setPopup('sign-up')">Sign Up</ui-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { GET_USER } from "@/store/modules/user/types";
import { SET_POPUP } from "@/store/modules/content/types";

export default {
  name: "HeaderUser",

  computed: {
    ...mapGetters("user", {
      user: GET_USER,
    }),
  },

  methods: {
    ...mapActions("user", ["logout"]),
    ...mapMutations("content", {
      setPopup: SET_POPUP,
    }),

    async sendLogout() {
      await this.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/system";

$block: ".header-user";

#{$block} {
  flex: 0 0 auto;
  margin: 0 0 0 var(--gap);

  &__content {
    display: flex;
    align-items: center;
    padding: var(--gap-0-5) 0;
  }

  &__avatar {
    margin: 0 var(--gap-0-5) 0 0;
  }

  &__actions {
    .ui-button {
      margin-left: var(--gap-0-5);
    }
  }
}
</style>
