import { createStore } from "vuex";

// Please follow these naming conventions https://github.com/vuestorefront/vue-storefront/issues/2069
const getDefaultState = () => {
  return {
    recipeOptions: [],
    fullRecipeResults: {},
    chosenRecipe: {},
    ingredientOptions: [],
    chosenIngredient: "",
  };
};

export default createStore({
  state() {
    return {
      recipeOptions: [],
      fullRecipeResults: {},
      chosenRecipe: {},
      ingredientOptions: [],
      chosenIngredient: "",
    };
  },
  getters: {},
  mutations: {
    RESET(state) {
      Object.assign(state, getDefaultState());
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
    resetState({ commit }) {
      commit("RESET");
    },
  },
  modules: {},
});
