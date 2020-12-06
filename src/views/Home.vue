<template>
  <div class="home">
    <hero size="medium">
      <Generator slot="side" />
    </hero>

    <Partners />

    <Features />

    <div class="space" />

    <TheFooter />
  </div>
</template>

<script>
import Hero from "@/components/shared/Landing/Hero";
import Partners from "@/components/shared/Landing/Partners";
import Features from "@/components/shared/Landing/Features";
import Generator from "@/components/shared/Generator";
import TheFooter from "@/components/shared/TheFooter";

export default {
  name: "HomeView",

  components: {
    Hero,
    Partners,
    Features,
    Generator,
    TheFooter,
  },

  metaInfo: {
    title: "Calculate the cost of project development easily",
  },
};
</script>

<style lang="scss">
$block: ".home";

#{$block} {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}
</style>
