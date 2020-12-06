<template>
  <footer class="footer">
    <ui-container>
      <div class="footer__content">
        <router-link to="/" class="footer__brand">
          <span class="footer__name">estim8.</span>
          <span class="footer__ext">work</span>
        </router-link>

        <Nav />

        <Social />
      </div>
    </ui-container>
  </footer>
</template>

<script>
import Nav from "@/components/shared/TheFooter/Nav";
import Social from "@/components/shared/TheFooter/Social";

export default {
  name: "Footer",

  components: {
    Nav,
    Social,
  },
};
</script>

<style lang="scss">
$block: ".footer";

#{$block} {
  & {
    padding: var(--gap) 0;
    border-top: 1px solid var(--color-border);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__brand {
    margin: 0 var(--gap-2) 0 0;
    color: var(--color-text-hint);
    font-family: var(--font-family-brand);
    font-size: var(--font-size-legend);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
  }

  &__name {
    display: block;
  }

  &__ext {
    display: block;
    margin: -8px 0 0 49px;
  }
}
</style>
