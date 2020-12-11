<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="form__legend">Forgot Password</h2>

    <div class="form__fieldset">
      <div class="form__row">
        <ui-field label="Your Email">
          <ui-input
            v-model="email"
            ref="email"
            name="email"
            size="big"
            class="input"
            placeholder="Enter Your Email"
            native-type="email"
            :error="!isEmailValid && emailWasChanged"
            :success="isEmailValid && emailWasChanged"
            @change="changeStatus('email')"
          />
        </ui-field>
      </div>

      <div class="form__row">
        <p class="text-secondary text-small">
          <ui-button type="link" @click="$emit('redirect', 'change-password')">
            Reset password (tmp)
          </ui-button>
        </p>
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
          Submit
        </ui-button>
      </div>

      <div class="form__row">
        <p class="text-secondary text-small text-center">
          Back to
          <ui-button type="link" @click="$emit('redirect', 'login')">
            Login
          </ui-button>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import authMixin from "@/mixins/auth";

export default {
  name: "AuthForgot",

  mixins: [authMixin],

  data() {
    return {
      email: "",
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
      });
      this.$emit("close");
    },

    cancel() {
      this.$emit("close");
    },
  },
};
</script>
