<template>
  <div class="features">
    <ui-container>
      <div class="features__content">
        <article class="features__list">
          <section
            v-for="(feature, index) in features"
            :key="index"
            class="features__item"
          >
            <div class="features__text">
              <h2>{{ feature.title }}</h2>
              <p>{{ feature.text }}</p>
            </div>
            <div class="features__preview">
              <img
                class="features__image"
                :src="`/uploads/${feature.image}.png`"
                alt=""
              />
            </div>
          </section>
        </article>
      </div>
    </ui-container>
  </div>
</template>

<script>
export default {
  name: "LandingFeatures",

  data() {
    return {
      features: [
        {
          title: "Feed mode for fast cost management",
          text: "Add new tasks easily and manage their cost.",
          image: "feed",
        },
        {
          title: "Board mode to manage project status",
          text:
            "Manage task statuses on the kanban-board as you are used to doing in other tools.",
          image: "board",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".features";

#{$block} {
  background: var(--color-light);

  &__list {
    @extend %resetList;
  }

  &__item {
    padding: var(--gap-2) 0;

    &:not(:first-child) {
      border-top: 1px solid var(--color-border);
    }

    @include display-less(desktop) {
      text-align: center;
    }

    @include display(desktop) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
  }

  &__text {
    flex: 1;
  }

  &__preview {
    @include display-less(desktop) {
      margin: var(--gap-2) 0 0;
    }

    @include display(desktop) {
      flex: 0 0 60%;
      margin-left: var(--gap-2);

      #{$block}__item:nth-child(even) & {
        margin: 0 var(--gap-2) 0 0;
      }
    }
  }

  &__image {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--border-raius-big);
    box-shadow: 0 10px 30px -10px rgba(#000, 0.2);
    vertical-align: bottom;

    @include display(desktop) {
      box-shadow: 10px 10px 30px -10px rgba(#000, 0.2);

      #{$block}__item:nth-child(even) & {
        box-shadow: -10px 10px 30px -10px rgba(#000, 0.2);
      }
    }
  }
}
</style>
