<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="form__legend">Enter New Password</h2>

    <div class="form__fieldset">
      <div class="form__row">
        <ui-field label="New Password">
          <ui-input
            v-model="password"
            ref="password"
            name="password"
            size="big"
            class="input"
            placeholder="Enter new Password"
            native-type="password"
            :error="!isPasswordValid && passwordWasChanged"
            :success="isPasswordValid && passwordWasChanged"
            @change="changeStatus('password')"
          />
        </ui-field>
      </div>

      <div class="form__row">
        <ui-field label="New Password again">
          <ui-input
            v-model="password2"
            name="password"
            size="big"
            class="input"
            placeholder="Enter new Password again"
            native-type="password"
            :error="!isPassword2Valid && password2WasChanged"
            :success="isPassword2Valid && password2WasChanged"
            @change="changeStatus('password2')"
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
  name: "AuthChangePassword",

  mixins: [authMixin],

  data() {
    return {
      password: "",
      password2: "",
    };
  },

  mounted() {
    this.$refs.password.focus();
  },

  methods: {
    ...mapActions("user", ["login"]),

    async handleSubmit() {
      await this.login({
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
