<template>
  <div :class="avatarClass" :style="avatarStyles">
    <img
      v-if="finishedPhoto"
      :src="finishedPhoto"
      :alt="name || ''"
      class="ui-avatar__photo"
    />
  </div>
</template>

<script>
export default {
  name: "UiAvatar",

  props: {
    photo: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    sex: {
      type: String,
      default: "default",
    },
    size: {
      type: [Number, Array],
      default: 32,
    },
    radius: {
      type: Number,
      default: 10,
    },
    logo: Boolean,
    clear: Boolean,
    rounded: Boolean,
    shadow: Boolean,
  },

  computed: {
    finishedPhoto() {
      if (!this.photo && !this.logo) {
        return;
      }

      return this.photo || "/images/square-logo.png";
    },

    avatarClass() {
      return {
        "ui-avatar": true,
        ["ui-avatar_" + this.sex]: !this.photo,
        "ui-avatar_placeholder": !this.finishedPhoto,
        "ui-avatar_clear": this.clear && !this.photo,
        "ui-avatar_rounded": this.rounded,
      };
    },

    avatarStyles() {
      let width = this.size;
      let height = this.size;
      let radius = "50%";

      if (typeof this.size === "object") {
        width = this.size[0];
        height = this.size.length > 1 ? this.size[1] : width;
      }

      if (this.rounded) {
        width >= height ? (radius = width) : (radius = height);
      }

      if (this.radius && !this.rounded) {
        radius = this.radius + "px";
      }

      return {
        width: width + "px",
        height: height + "px",
        borderRadius: radius,
        boxShadow: this.shadow
          ? `0 ${width / 48}px ${width / 16}px rgba(0,0,0, 0.5)`
          : undefined,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-avatar {
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  background: var(--color-bg);
  transition: box-shadow var(--speed);

  &_placeholder {
    &::before,
    &::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      background: #b5b5b5;
    }

    &::before {
      top: 29%;
      left: 29%;
      width: 42%;
      height: 42%;
    }

    &::after {
      top: 80%;
      left: 12%;
      width: 76%;
      height: 76%;
    }
  }

  &_male {
    background: rgba(var(--color-info), 0.1);

    &::before,
    &::after {
      background: var(--color-info);
      opacity: 0.25;
    }
  }

  &_female {
    background: rgba(var(--color-primary), 0.1);

    &::before,
    &::after {
      background: var(--color-primary);
      opacity: 0.25;
    }
  }

  &_clear {
    box-shadow: inset 0 0 0 1px #b5b5b5;
    background: var(--color-light);

    &::before,
    &::after {
      opacity: 1;
    }
  }

  &_clear.ui-avatar_male {
    box-shadow: inset 0 0 0 1px var(--color-info);
  }

  &_clear.ui-avatar_female {
    box-shadow: inset 0 0 0 1px var(--color-primary);
  }

  &_rounded {
    border-radius: 50%;
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    vertical-align: top;
  }
}
</style>
