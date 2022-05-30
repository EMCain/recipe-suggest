import { createStore } from "vuex";

import { TEMPLATES, OPINIONS, REPLACEMENT_INGREDIENTS } from "../constants.js";

// Please follow these naming conventions https://github.com/vuestorefront/vue-storefront/issues/2069
const getDefaultState = () => {
  return {
    recipeOptions: [],
    fullRecipeResults: {},
    chosenRecipe: {},
    ingredientOptions: [],
    chosenIngredient: "",
    currentComment: "",
    currentRating: 0,
    pastComments: [],
  };
};

export default createStore({
  state() {
    return getDefaultState();
  },
  getters: {},
  mutations: {
    RESET(state) {
      Object.assign(state, getDefaultState());
    },
    GENERATE_COMMENT(state) {
      if (state.chosenIngredient) {
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

        state.currentComment =
          replacementTemplate
            .replace("{OLD_ING}", state.chosenIngredient)
            .replace("{NEW_ING}", newIngredient) +
          " " +
          opinion;
        state.currentRating = Math.floor(Math.random() * 3) + 1;
      } else {
        state.currentComment = null;
        state.currentRating = 0;
      }
    },
    ARCHIVE_COMMENT_AND_RESET(state) {
      const pastComments = [
        ...state.pastComments,
        {
          title: state.chosenRecipe.title,
          rating: state.currentRating,
          comment: state.currentComment,
        },
      ];
      var newState = getDefaultState();
      newState.pastComments = pastComments;
      console.log(newState);
      Object.assign(state, newState);
    },
    SET_OPTIONS(state, responseData) {
      if (responseData.meals !== null) {
        const meals = responseData.meals.slice(0, 10);
        state.recipeOptions = meals.map((meal) => {
          return { id: meal.idMeal, title: meal.strMeal };
        });
        state.fullRecipeResults = meals.reduce((obj, meal) => {
          const ingredientKeys = Object.keys(meal).filter((key) =>
            key.startsWith("strIngredient")
          );
          const ingredients = ingredientKeys
            .map((key) => meal[key])
            .filter((key) => key);
          // Don't add recipes with no ingredients
          if (ingredients.length > 0) {
            obj[meal.idMeal] = {
              id: meal.idMeal,
              title: meal.strMeal,
              ingredients,
            };
          }
          return obj;
        }, {});
      }
    },
    CHOOSE_RECIPE(state, recipeID) {
      state.chosenRecipe = state.fullRecipeResults[recipeID];
    },
    CHOOSE_INGREDIENT(state, ingredientName) {
      state.chosenIngredient = ingredientName;
    },
  },
  actions: {
    chooseIngredient(store, ingredient) {
      store.commit("CHOOSE_INGREDIENT", ingredient);
      store.commit("GENERATE_COMMENT");
    },
    resetState({ commit }) {
      commit("RESET");
    },
    archiveAndReset({ commit }) {
      commit("ARCHIVE_COMMENT_AND_RESET");
    },
  },
  modules: {},
});
