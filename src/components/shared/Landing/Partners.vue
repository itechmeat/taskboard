<template>
  <div class="partners">
    <ui-container>
      <div class="partners__content">
        <ul class="partners__list">
          <li
            v-for="(partner, index) in partners"
            :key="index"
            class="partners__item"
          >
            <img
              class="partners__logo"
              :src="`/img/partners/${partner}.svg`"
              alt=""
            />
          </li>
        </ul>
      </div>
    </ui-container>
  </div>
</template>

<script>
export default {
  name: "LandingPartners",

  data() {
    return {
      partners: ["upwork", "freelancer", "fiverr", "weblancer"],
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".partners";

#{$block} {
  padding: var(--gap-2) 0;

  &__list {
    @extend %resetList;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
  }

  &__logo {
    height: 40px;
  }
}
</style>
