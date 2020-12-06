<template>
  <div class="page">
    <ui-article>
      <ui-container size="medium">
        <ui-content>
          <h1>About the estim8.work project</h1>
          <p>...</p>
          <div
            style="
              font-family: var(--font-family-brand);
              font-size: 220px;
              width: 512px;
              color: var(--color-light);
              background: var(--color-primary);
              padding: 400px 0;
              text-align: center;
            "
          >
            m8
          </div>
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
