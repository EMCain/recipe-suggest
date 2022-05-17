<template>
  <div class="wrapper">
    <h2>What ingredient are you out of?</h2>
    <ul>
      <li v-for="(ingredient, i) in chosenRecipe.ingredients" :key="i">
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
};
</script>
