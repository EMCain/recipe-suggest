<template>
  <div class="wrapper">
    <div class="content">
      <h1>Helpful Recipe Comments 🧑‍🍳</h1>
      <p>Generate a comment on your favorite recipe</p>
      <recipe-search />
    </div>
  </div>
</template>

<script>
import RecipeSearch from "../components/RecipeSearch.vue";

export default {
  data() {
    return {
      searchOpen: false,
    };
  },
  components: { RecipeSearch },
};
</script>
