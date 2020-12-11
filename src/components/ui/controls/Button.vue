<template>
  <component
    :is="tag"
    :to="to ? to : undefined"
    :href="href ? href : undefined"
    :target="href ? '_blank' : false"
    :rel="href ? 'noopener' : false"
    :disabled="disabled || loading"
    :class="buttonClass"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="$slots.default" class="ui-button__text">
      <slot />
    </span>
  </component>
</template>

<script>
export default {
  name: "UiButton",

  props: {
    to: {
      type: String,
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: "default",
    },
    nativeType: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: "medium",
    },
    alignment: {
      type: String,
      default: "center",
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconPosition: {
      type: String,
      default: "left",
    },
    rounded: Boolean,
    outlined: Boolean,
    expanded: Boolean,
    disabled: Boolean,
    loading: Boolean,
  },

  computed: {
    tag() {
      if (this.to) {
        return "router-link";
      }

      if (this.href) {
        return "a";
      }

      return "button";
    },

    buttonClass() {
      return {
        "ui-button": true,
        ["ui-button_" + this.type]: true,
        ["ui-button_" + this.size]: true,
        ["ui-button_" + this.alignment]: true,
        "ui-button_rounded": this.rounded,
        "ui-button_outlined": this.outlined,
        "ui-button_expanded": this.expanded,
        "ui-button_icon": this.iconPosition === "center",
        "ui-button_reverse": this.iconPosition === "right",
        "ui-button_disabled": this.disabled || this.loading,
      };
    },

    iconSize() {
      switch (this.size) {
        case "small":
          return 14;
        case "big":
          return 18;
      }
      return 16;
    },
  },

  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

@mixin buttonStyle($type, $bgc, $text, $shadow: $bgc) {
  background: $bgc;
  color: $text;

  $shadowColor: $shadow;
  $disabledBg: rgba($bgc, 0.5);
  $disabledColor: rgba($text, 0.7);
  @if $type == "default" OR $type == "light" {
    $shadowColor: #999;
    $disabledBg: #b0b0d3;
    $disabledColor: #fff;
  }

  &:hover {
    background: adjust-color($bgc, $lightness: -10);
  }

  &:active,
  &.active {
    background: adjust-color($bgc, $lightness: -15);
  }

  &:focus {
    background: adjust-color($bgc, $lightness: -20);
  }

  &.ui-button_disabled {
    background: $disabledBg;
    color: $disabledColor;
    cursor: default;

    &:focus {
      box-shadow: none;
    }
  }

  &.ui-button_outlined {
    @if $type == "default" {
      border: 2px solid $colorTextSecondary;
      color: $colorTextSecondary;
    } @else {
      border: 2px solid $bgc;
      color: $bgc;
    }
    @if $type == "light" {
      color: $colorTextSecondary;
    }
    background: none;
    line-height: calc(100% - 4px);

    &:hover,
    &:active,
    &:focus {
      @if $type == "light" {
        border: 2px solid $colorTextSecondary;
        color: $colorTextSecondary;
      }
      background: rgba($bgc, 0.1);
    }
  }

  &.ui-button_outlined.ui-button_disabled {
    @if $type == "default" {
      border: 2px solid rgba($colorTextSecondary, 0.5);
      color: rgba($colorTextSecondary, 0.5);
    } @else {
      border: 2px solid rgba($bgc, 0.3);
      color: rgba($bgc, 0.7);
    }
    @if $type == "light" {
      color: rgba($colorTextSecondary, 0.7);
    }

    &:hover,
    &:active,
    &:focus {
      background: none;
    }
  }
}

@mixin buttonSize($size) {
  min-width: $size;
  min-height: $size;
  line-height: $size;
}

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0 var(--gap);
  border: none;
  border-radius: 4px;
  background: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  transition: var(--speed);

  // color

  &_default {
    @include buttonStyle("default", #f4f4f4, $colorText, $colorInfo);
  }

  &_light {
    @include buttonStyle("light", $colorLight, $colorText, $colorInfo);
  }

  &_primary {
    @include buttonStyle("primary", $colorPrimary, $colorLight);
  }

  &_accent {
    @include buttonStyle("accent", $colorAccent, $colorLight);
  }

  &_success {
    @include buttonStyle("success", $colorSuccess, $colorLight);
  }

  &_danger {
    @include buttonStyle("danger", $colorDanger, $colorLight);
  }

  &_info {
    @include buttonStyle("info", $colorInfo, $colorLight);
  }

  &_link {
    @include buttonStyle("text", transparent, $colorPrimary);
    text-decoration: underline;

    &:hover {
      color: $colorPrimary;
      text-decoration: none;
    }
  }

  &_clear {
    background: none;

    &:hover {
      background: rgba(#000, 0.1);
    }
  }

  &_left {
    text-align: left;
  }

  &_right {
    text-align: right;
  }

  // size

  &_medium {
    @include buttonSize(32px);
    font-size: var(--font-size-base);

    &.ui-button_rounded {
      border-radius: 32px;
    }
  }

  &_small {
    @include buttonSize(28px);
    font-size: var(--font-size-small);

    &.ui-button_rounded {
      border-radius: 28px;
    }
  }

  &_tiny {
    @include buttonSize(24px);
    padding: 0 var(--gap-0-5);
    font-size: var(--font-size-small);

    &.ui-button_rounded {
      border-radius: 24px;
    }
  }

  &_big {
    @include buttonSize(46px);
    font-size: var(--font-size-big);

    &.ui-button_rounded {
      border-radius: 46px;
    }
  }

  &_large {
    @include buttonSize(64px);
    font-size: var(--font-size-bigger);

    &.button_rounded {
      border-radius: 64px;
    }
  }

  // other

  &_expanded {
    display: flex;
    width: 100%;
  }

  &_icon {
    padding: 0;
  }

  &_reverse {
    flex-direction: row-reverse;
  }

  // elements

  &__text {
    flex: 0 0 auto;
  }

  &__icon {
    margin: 0 4px 0 0;
    line-height: 1;

    .ui-button_reverse & {
      margin: 0 0 0 4px;
    }

    .ui-button_icon & {
      margin: 0;
    }
  }

  &__loader {
    @extend %fill;
    border-radius: inherit;
  }
}
</style>
