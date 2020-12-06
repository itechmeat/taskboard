<template>
  <div class="hero">
    <ui-container :size="size">
      <div class="hero__content">
        <div class="hero__main">
          <slot>
            <p><b>For Freelancers</b></p>
            <h1>Calculate the cost of project development easily</h1>
            <p>
              Sometimes it is difficult to calculate how much the development of
              a project will cost.
            </p>
            <p>
              <b>estim8.work</b> will help you make such a calculation and
              generate an invoice for your client.
            </p>
          </slot>
        </div>

        <div v-if="$slots.side" class="hero__side">
          <slot name="side" />
        </div>
      </div>
    </ui-container>
  </div>
</template>

<script>
export default {
  name: "LandingHero",

  props: {
    size: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".hero";

#{$block} {
  padding: 60px 0;
  background: var(--color-text);
  color: var(--color-light);

  &__content {
    @include display-less(desktop) {
      text-align: center;
    }

    @include display(desktop) {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr auto;
      grid-gap: var(--gap-2);
    }
  }

  &__main {
    position: relative;
  }

  &__side {
    @include display-less(desktop) {
      margin-top: var(--gap-2);
    }

    @include display(desktop) {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: var(--gap);
    }
  }
}
</style>
