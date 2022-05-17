import { createStore } from "vuex";

// Please follow these naming conventions https://github.com/vuestorefront/vue-storefront/issues/2069

export default createStore({
  state() {
    return {
      recipeOptions: [],
      fullRecipeResults: {},
      chosenRecipe: {},
      ingredientOptions: [],
    };
  },
  getters: {},
  mutations: {
    RESET() {
      return {
        recipeOptions: [],
        fullRecipeResults: {},
        chosenRecipe: {},
        ingredientOptions: [],
      };
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
          obj[meal.idMeal] = {
            id: meal.idMeal,
            title: meal.strMeal,
            ingredients,
          };
          return obj;
        }, {});
      } else {
        self.RESET();
      }
    },
    CHOOSE_RECIPE(state, recipeID) {
      state.chosenRecipe = state.fullRecipeResults[recipeID];
    },
  },
  actions: {},
  modules: {},
});
