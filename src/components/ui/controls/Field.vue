<template>
  <component
    :is="tag"
    :class="['ui-field', { 'ui-field_error': errorMessage }]"
  >
    <span v-if="label" class="ui-field__label">
      {{ label }}
      <b v-if="required" class="ui-field__required">*</b>
    </span>
    <span v-if="hint" class="ui-field__hint">{{ hint }}</span>
    <span class="ui-field__control">
      <slot />
    </span>
    <span v-if="errorMessage" class="ui-field__error">{{ errorMessage }}</span>
    <span v-if="successMessage" class="ui-field__success">
      {{ successMessage }}
    </span>
  </component>
</template>

<script>
export default {
  name: "UiField",

  props: {
    tag: {
      type: String,
      default: "label",
    },
    label: {
      type: String,
      default: undefined,
    },
    hint: {
      type: String,
      default: undefined,
    },
    errorMessage: {
      type: String,
      default: undefined,
    },
    successMessage: {
      type: String,
      default: undefined,
    },
    required: Boolean,
  },
};
</script>

<style lang="scss">
$block: ".ui-field";

#{$block} {
  display: flex;
  flex-wrap: wrap;

  &__label {
    flex: 0 0 auto;
    margin: 0 0 var(--gap-0-5);
    font-weight: 500;
  }

  &__hint {
    flex: 0 0 auto;
    margin: 0 0 var(--gap-0-5) auto;
    color: var(--color-text-hint);
  }

  &__control {
    flex: 0 0 100%;
  }

  &__error,
  &__success {
    flex: 0 0 auto;
    margin: var(--gap-0-5) 0 0;
  }

  &__error {
    color: var(--color-danger);
  }

  &__success {
    color: var(--color-success);
  }

  &__required {
    color: var(--color-danger);
  }
}
</style>
