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

<style scoped lang="scss">
// TODO: https://webdevetc.com/programming-tricks/vue3/vue3-guides/vue-3-global-scss-sass-variables/
$beige: #eae7c6;
$light-green: #bccc9a;
$dark-green: darken($light-green, 40%);
$rose: #c37b89;
$dark-rose: darken($rose, 40%);
$light-blue: #d1e8e4;
$dark-blue: darken($light-blue, 50%);

.comment-card {
  background-color: $light-blue;
  color: $dark-rose;
}
</style>
