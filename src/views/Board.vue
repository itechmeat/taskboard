<template>
  <Board />
</template>

<script>
import Board from "@/components/shared/Board";

export default {
  name: "BoardView",

  components: {
    Board,
  },

  metaInfo: {
    title: "Project",
  },
};
</script>
