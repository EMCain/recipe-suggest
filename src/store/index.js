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
    SET_OPTIONS(state, responseData) {
      if (responseData.meals !== null) {
        const meals = responseData.meals.slice(0, 10);
        state.recipeOptions = meals.map((meal) => {
          return { id: meal.idMeal, title: meal.strMeal };
        });
        // TODO set fullRecipeResults with the ingredients parsed in order
      }
    },
  },
  actions: {},
  modules: {},
});
