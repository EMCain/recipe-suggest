<template>
  <div class="comment-card">
    <h3>Comment on {{ chosenRecipe.title }}</h3>
    <div>{{ starsEmoji }}</div>
    <h2>{{ comment }}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    stars: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["chosenRecipe"]),
    starsEmoji() {
      return "\u2605".repeat(this.stars) + "\u2606".repeat(5 - this.stars);
    },
  },
};
</script>
