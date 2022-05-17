<template>
  <div class="wrapper">
    <h2>What ingredient are you out of?</h2>
    <ul>
      <li
        v-for="(ingredient, i) in chosenRecipe.ingredients"
        :key="i"
        @click="selectIngredient(ingredient)"
      >
        {{ ingredient }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    isAsync: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    ...mapState(["chosenRecipe"]),
  },
  methods: {
    selectIngredient(ingredient) {
      console.log(ingredient);
    },
  },
};
</script>

<style lang="scss">
$beige: #eae7c6;
$light-green: #bccc9a;
$dark-green: darken($light-green, 40%);
$rose: #c37b89;
$dark-rose: darken($rose, 40%);
$light-blue: #d1e8e4;
$dark-blue: darken($light-blue, 50%);

li:hover {
  background-color: $dark-blue;
  color: white;
}
</style>
