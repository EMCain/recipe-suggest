<template>
  <div class="comment-card">
    <h3>Comment on {{ chosenRecipe.title }}</h3>
    <div>{{ starsEmoji }}</div>
    <h2>{{ comment }}</h2>
    <a href="#" @click="resetState">Comment on Another Recipe</a>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
  methods: {
    ...mapActions(["resetState"]),
  },
};
</script>
