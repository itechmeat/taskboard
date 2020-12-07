<template>
  <div class="footer-social">
    <a
      href="https://t.me/estim8work"
      target="_blank"
      class="footer-social__link"
    >
      <i class="mdi mdi-24px mdi-telegram"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "FooterSocial",
};
</script>

<style lang="scss">
$block: ".footer-social";

#{$block} {
  display: flex;

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--gap-2);
    height: var(--gap-2);
    border: 2px solid;
    border-radius: 50%;
    color: var(--color-text-hint);
  }
}
</style>
