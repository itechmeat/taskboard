<template>
  <nav class="footer-nav">
    <ul class="footer-nav__list">
      <li class="footer-nav__item">
        <router-link to="/" class="footer-nav__link">About Us</router-link>
      </li>
      <li class="footer-nav__item">
        <router-link to="/" class="footer-nav__link">Pricing</router-link>
      </li>
      <li class="footer-nav__item">
        <router-link to="/" class="footer-nav__link">Careers</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "FooterNav",
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".footer-nav";

#{$block} {
  &__list {
    @extend %resetList;
    display: flex;
    align-items: center;
  }

  &__item {
    &:not(:first-child) {
      margin-left: var(--gap-2);
    }
  }

  &__link {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
