<template>
  <div class="page">
    <ui-article>
      <ui-container size="medium">
        <ui-content>
          <h1>About the estim8.work project</h1>
          <p>...</p>
        </ui-content>
      </ui-container>
    </ui-article>

    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "@/components/shared/TheFooter";

export default {
  name: "AboutView",

  components: {
    TheFooter,
  },

  metaInfo: {
    title: "About Us",
  },
};
</script>
