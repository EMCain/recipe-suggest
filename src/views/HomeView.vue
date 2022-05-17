<template>
  <div class="wrapper">
    <div class="content">
      <h1>Helpful Recipe Comments 🧑‍🍳</h1>
      <p>Generate a comment on your favorite recipe</p>

      <comment-card v-if="comment" :comment="comment" :stars="stars" />
      <div v-else>
        <recipe-search />
        <choose-ingredient v-if="Object.keys(chosenRecipe).length" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CommentCard from "../components/CommentCard.vue";
import ChooseIngredient from "../components/ChooseIngredient.vue";
import RecipeSearch from "../components/RecipeSearch.vue";

import { TEMPLATES, OPINIONS, REPLACEMENT_INGREDIENTS } from "../constants.js";

export default {
  data() {
    return {
      searchOpen: false,
    };
  },
  computed: {
    ...mapState(["chosenRecipe", "chosenIngredient"]),
    stars() {
      return Math.floor(Math.random() * 3) + 1;
    },
    comment() {
      if (this.chosenIngredient) {
        //return `I replaced ${this.chosenIngredient} with (random). Gross!`;
        const replacementTemplate =
          TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
        const newIngredient =
          REPLACEMENT_INGREDIENTS[
            Math.floor(Math.random() * REPLACEMENT_INGREDIENTS.length)
          ];

        let opinion = OPINIONS[Math.floor(Math.random() * OPINIONS.length)];
        const exclamationPoints = Math.floor(Math.random() * 5);
        if (exclamationPoints) {
          opinion += "!".repeat(exclamationPoints);
        } else {
          opinion += ".";
        }

        return (
          replacementTemplate
            .replace("{OLD_ING}", this.chosenIngredient)
            .replace("{NEW_ING}", newIngredient) +
          " " +
          opinion
        );
      } else {
        return false;
      }
    },
  },
  components: { CommentCard, RecipeSearch, ChooseIngredient },
};
</script>
