<template>
  <div class="wrapper">
    <div class="content">
      <h1>Helpful Recipe Comments 🧑‍🍳</h1>
      <p>Generate a comment on your favorite recipe</p>
      <recipe-search />
      <choose-ingredient v-show="chosenRecipe" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import RecipeSearch from "../components/RecipeSearch.vue";
import ChooseIngredient from "../components/ChooseIngredient.vue";

export default {
  data() {
    return {
      searchOpen: false,
    };
  },
  computed: {
    ...mapState(["chosenRecipe"]),
  },
  components: { RecipeSearch, ChooseIngredient },
};
</script>
