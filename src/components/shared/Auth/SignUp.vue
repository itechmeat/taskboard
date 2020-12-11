<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="form__legend">Sign Up to estim8.work</h2>

    <div class="form__fieldset">
      <div class="form__row">
        <ui-field label="Your Name">
          <ui-input
            v-model="firstName"
            ref="name"
            name="firstName"
            size="big"
            class="input"
            placeholder="Enter Your First Name"
          />
        </ui-field>
      </div>

      <div class="form__row">
        <ui-field label="Your Name">
          <ui-input
            v-model="lastName"
            name="lastName"
            size="big"
            class="input"
            placeholder="Enter Your Last Name"
          />
        </ui-field>
      </div>

      <div class="form__row">
        <ui-field label="Your Email">
          <ui-input
            v-model="email"
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
        <ui-field label="Your Password">
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
          By signing up, you confirm that you've read and accepted our
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
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
          Sign Up
        </ui-button>
      </div>

      <div class="form__row">
        <p class="text-secondary text-small text-center">
          Already have an account?
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
  name: "AuthSignUp",

  mixins: [authMixin],

  data() {
    return {
      firstName: "",
      lastName: "",
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
    this.$refs.name.focus();
  },

  methods: {
    ...mapActions("user", ["fetchUsers"]),

    async handleSubmit() {
      await this.fetchUsers();
      // await this.signUp({
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   email: this.email,
      //   password: this.password,
      // });
      this.$emit("close");
    },

    cancel() {
      this.$emit("close");
    },
  },
};
</script>
