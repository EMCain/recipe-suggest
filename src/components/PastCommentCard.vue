<template>
  <div class="past-comment">
    <p @click="REMOVE_COMMENT(index)" class="delete-button"><trash-2-icon /></p>
    <h2>{{ title }}</h2>
    <star-rating :rating="rating" />
    <p>{{ comment }}</p>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Trash2Icon } from "@vue-icons/feather";

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
  methods: {
    ...mapMutations(["REMOVE_COMMENT"]),
  },
  components: { StarRating, Trash2Icon },
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
  .delete-button {
    text-align: right;
  }
}
</style>
