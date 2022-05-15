<template>
  <div class="wrapper">
    <div class="content">
      <h1>Helpful Recipe Comments 🧑‍🍳</h1>
      <p>Generate a comment on your favorite recipe</p>
      <recipe-search :items="items" />
    </div>
  </div>
</template>

<script>
import RecipeSearch from "../components/RecipeSearch.vue";

export default {
  data() {
    return {
      searchOpen: false,
      items: [
        "American sub",
        "Bacon",
        "Bacon, egg and cheese",
        "Bagel toast",
        "Baked bean",
        "Bologna salad sandwich",
        "Bánh mì",
        "Barbecue",
      ],
    };
  },
  components: { RecipeSearch },
};
</script>
