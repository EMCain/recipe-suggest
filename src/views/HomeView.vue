<template>
  <div class="row">
    <div class="main-column">
      <h1>Helpful Recipe Comments 🧑‍🍳</h1>
      <p>
        Missing an ingredient from your favorite recipe? Don't let that stop you
        from commenting!
      </p>

      <current-comment-card v-if="currentComment" />
      <div v-else>
        <recipe-search />
        <choose-ingredient v-if="Object.keys(chosenRecipe).length" />
      </div>
    </div>
    <div class="side-column">
      <h2>Previous Comments</h2>
      <div v-if="pastComments.length > 0" class="past-comments">
        <past-comment-card
          v-for="(comment, index) in pastComments"
          :title="comment.title"
          :rating="comment.rating"
          :comment="comment.comment"
          :index="index"
          :key="index"
        />
      </div>
      <div v-else class="past-comments">
        You haven't left any comments yet. Search for a recipe to start!
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CurrentCommentCard from "../components/CurrentCommentCard.vue";
import ChooseIngredient from "../components/ChooseIngredient.vue";
import RecipeSearch from "../components/RecipeSearch.vue";
import PastCommentCard from "../components/PastCommentCard.vue";

export default {
  data() {
    return {
      searchOpen: false,
    };
  },
  computed: {
    ...mapState([
      "chosenRecipe",
      "chosenIngredient",
      "pastComments",
      "currentComment",
    ]),
  },
  components: {
    CurrentCommentCard,
    RecipeSearch,
    ChooseIngredient,
    PastCommentCard,
  },
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

.row {
  display: flex;
  .main-column {
    flex: 75%;
  }
  .side-column {
    flex: 25%;
  }
  .past-comments {
    padding: 1em;
    outline: solid $dark-green;
    background: $light-green;
  }
}
</style>
