<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__fieldset">
      <div class="form__row">
        <ui-field label="Your Email">
          <ui-input
            v-model="email"
            ref="email"
            size="big"
            class="input"
            placeholder="Enter Your Email"
          />
        </ui-field>
      </div>

      <div class="form__row form__row_far">
        <ui-field label="Your Password">
          <ui-input
            v-model="password"
            size="big"
            class="input"
            placeholder="Enter Your Password"
            type="password"
          />
        </ui-field>
      </div>

      <div class="form__row form__row_submit">
        <ui-button
          type="default"
          size="big"
          native-type="cancel"
          @click="cancel"
        >
          Cancel
        </ui-button>
        <div class="space" />
        <ui-button type="primary" size="big" native-type="submit">
          Login
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AuthLogin",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  mounted() {
    this.$refs.email.focus();
  },

  methods: {
    ...mapActions("user", ["login"]),

    async handleSubmit() {
      await this.login({
        email: this.email,
        password: this.password,
      });
      this.$emit("close");
    },

    cancel() {
      this.$emit("close");
    },
  },
};
</script>
