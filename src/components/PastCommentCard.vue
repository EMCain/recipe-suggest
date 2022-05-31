<template>
  <div class="past-comment">
    <p class="button-container">
      <span
        v-if="currentlyEditing == index"
        @click="STOP_EDITING_COMMENT()"
        class="save-button"
        title="Save Comment"
      >
        <save-icon />
      </span>
      <span
        v-else
        @click="EDIT_COMMENT(index)"
        class="edit-button"
        title="Edit Comment"
      >
        <edit-icon />
      </span>
      <span
        @click="REMOVE_COMMENT(index)"
        class="delete-button"
        title="Delete Comment"
      >
        <trash-2-icon />
      </span>
    </p>
    <h2>{{ title }}</h2>
    <star-rating :rating="rating" />
    <textarea
      v-if="currentlyEditing == index"
      v-model="editedComment"
    ></textarea>
    <p v-else>{{ comment }}</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { EditIcon, SaveIcon, Trash2Icon } from "@vue-icons/feather";

import StarRating from "./StarRating.vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(["currentlyEditing", "pastComments"]),
    editedComment: {
      get() {
        return this.pastComments[this.index].comment;
      },
      set(value) {
        this.UPDATE_COMMENT(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "EDIT_COMMENT",
      "REMOVE_COMMENT",
      "UPDATE_COMMENT",
      "STOP_EDITING_COMMENT",
    ]),
  },
  components: { StarRating, Trash2Icon, EditIcon, SaveIcon },
};
</script>

<style lang="scss">
// TODO: https://webdevetc.com/programming-tricks/vue3/vue3-guides/vue-3-global-scss-sass-variables/
$beige: #eae7c6;
$light-green: #bccc9a;
$dark-green: darken($light-green, 40%);
$rose: #c37b89;
$dark-rose: darken($rose, 40%);
$light-blue: #d1e8e4;
$dark-blue: darken($light-blue, 50%);

.past-comment {
  background-color: $light-blue;
  border-radius: 5px;
  padding-bottom: 0.5em;
  * {
    padding: 0;
    margin: 0.5em;
  }
  .button-container {
    text-align: right;
    .delete-button {
      cursor: pointer;
    }
  }
}
</style>
