<template>
  <section
    v-if="value"
    :data-column="index"
    :draggable="canDrag"
    class="board-column"
  >
    <header class="board-column__header">
      <label>
        <input
          :value="value.name"
          ref="columnName"
          class="board-column__name"
          placeholder="Enter name"
          @focus="focus"
          @blur="save"
          @keyup.enter="enter"
        />
      </label>

      <ui-menu class="board-column__menu">
        <ui-menu-title>Actions</ui-menu-title>
        <ui-menu-item @click="addCard">Add Card</ui-menu-item>
        <ui-menu-item @click="deleteCards">Delete all cards</ui-menu-item>
        <ui-menu-item @click="deleteColumn">Delete this column</ui-menu-item>
        <ui-menu-title>Links</ui-menu-title>
        <ui-menu-item to="/">Inner link</ui-menu-item>
        <ui-menu-item href="https://google.com">Outer link</ui-menu-item>
      </ui-menu>
    </header>

    <div class="board-column__list">
      <CardGap
        :index="0"
        :active="overCardIndex === 0 && overTrackId === value.id"
        :visible="gapActive"
        :track="value.id"
      />

      <template v-for="(issue, index) in value.issues">
        <BoardCard
          :key="issue"
          :id="issue"
          :index="index"
          :data-track="value.id"
        />

        <CardGap
          :key="index + 'Gap'"
          :index="index + 1"
          :active="overCardIndex === index + 1 && overTrackId === value.id"
          :visible="gapActive"
          :track="value.id"
        />
      </template>
    </div>

    <footer class="board-column__footer">
      <ui-button
        expanded
        type="clear"
        class="ui-menu__control"
        @click="addCard"
      >
        Add new issue
      </ui-button>
    </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_ISSUE_BY_ID } from "@/store/modules/issues/types";
import BoardCard from "@/components/shared/Board/Card";
import CardGap from "@/components/shared/Board/CardGap";
import { clearText } from "@/libs/utils";

export default {
  name: "BoardColumn",

  props: {
    value: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    overCardIndex: {
      type: Number,
      default: null,
    },
    overTrackId: {
      type: String,
      default: null,
    },
    gapActive: Boolean,
  },

  data() {
    return {
      canDrag: true,
    };
  },

  components: {
    BoardCard,
    CardGap,
  },

  computed: {
    ...mapGetters("issues", {
      issue: GET_ISSUE_BY_ID,
    }),
  },

  methods: {
    ...mapActions("issues", ["saveIssue"]),

    focus() {
      this.canDrag = false;
    },

    save(e) {
      this.canDrag = true;
      const newText = clearText(e.target.value);
      if (newText === this.value.name) {
        return;
      }
      this.$emit("edit", {
        ...this.value,
        name: newText,
      });
    },

    enter() {
      this.$refs.columnName.blur();
    },

    addCard() {
      const name = prompt("Name of the Issue", "New Issue");

      this.saveIssue({
        name,
        description: "",
        trackId: this.value.id,
        tasks: [],
      });
    },

    deleteCards() {
      console.info("deleteCards (not implemented)");
    },

    deleteColumn() {
      this.$emit("delete", this.value.id);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/system";

$block: ".board-column";

#{$block} {
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  border-radius: var(--border-raius);
  background: var(--color-bg-accent);

  &__header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--gap-0-5);
  }

  &__name {
    flex: 1;
    margin: -4px 0;
    padding: 4px var(--gap-0-5);
    border: none;
    border-radius: var(--border-raius);
    background: none;
    font-size: var(--font-size-base);
    font-weight: 600;

    &:focus {
      background: var(--color-bg);
      outline: none;
    }
  }

  &__menu {
    flex: 0 0 auto;
    margin: 0 0 0 var(--gap-0-5);
  }

  &__list {
    @extend %resetList;
    flex: 1;
    padding: 0 var(--gap-0-5);
  }

  &__space {
    height: var(--gap-0-5);
  }

  &__footer {
    flex: 0 0 auto;
    padding: var(--gap-0-5);
  }
}
</style>
