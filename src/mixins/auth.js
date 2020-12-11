import { validateEmail } from "@/libs/utils";

export default {
  data() {
    return {
      emailWasChanged: false,
      passwordWasChanged: false,
      password2WasChanged: false,
    };
  },

  computed: {
    isEmailValid() {
      if (!this.email) {
        return;
      }
      return validateEmail(this.email);
    },

    isPasswordValid() {
      if (!this.password) {
        return;
      }
      return this.password.length > 7;
    },

    isPassword2Valid() {
      if (!this.password || !this.password2) {
        return;
      }
      return this.password === this.password2;
    },
  },

  methods: {
    changeStatus(val) {
      this[val + "WasChanged"] = true;
    },
  },
};
