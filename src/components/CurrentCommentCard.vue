<template>
  <div class="current-comment-card">
    <h3>Comment on {{ chosenRecipe.title }}</h3>
    <star-rating :rating="currentRating" />
    <h2>{{ currentComment }}</h2>
    <a href="#" @click="commentOnAnother">Comment on Another Recipe</a>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import StarRating from "./StarRating.vue";

export default {
  computed: {
    ...mapState(["chosenRecipe", "currentComment", "currentRating"]),
  },
  methods: {
    ...mapActions(["resetState", "archiveAndReset"]),
    commentOnAnother() {
      this.archiveAndReset();
    },
  },
  components: { StarRating },
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

.current-comment-card {
  background-color: $light-blue;
  color: $dark-rose;
}
</style>
