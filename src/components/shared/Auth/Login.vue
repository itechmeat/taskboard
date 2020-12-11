<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="form__legend">Login to estim8.work</h2>

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
        <ui-field label="Your Password" hint="Minimum 8 characters">
          <ui-input
            v-model="password"
            name="password"
            size="big"
            class="input"
            placeholder="Enter Your Password"
            native-type="password"
            :error="!isPasswordValid && passwordWasChanged"
            :success="isPasswordValid && passwordWasChanged"
            @change="changeStatus('password')"
          />
        </ui-field>
      </div>

      <div class="form__row">
        <p class="text-secondary text-small">
          Forgot your password?
          <ui-button type="link" @click="$emit('redirect', 'forgot')">
            Reset
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
        <ui-button
          type="primary"
          size="big"
          native-type="submit"
          :disabled="!canSubmit"
        >
          Login
        </ui-button>
      </div>

      <div class="form__row">
        <p class="text-secondary text-small text-center">
          Don't have an account?
          <ui-button type="link" @click="$emit('redirect', 'sign-up')">
            Sign Up
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
  name: "AuthLogin",

  mixins: [authMixin],

  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    canSubmit() {
      return this.isEmailValid && this.isPasswordValid;
    },
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
