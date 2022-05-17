<template>
  <div class="autocomplete">
    <input
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      type="text"
      placeholder="Search for a recipe"
    />
    <ul v-show="isOpen" class="autocomplete-results">
      <li v-if="isLoading" class="loading">Finding recipes...</li>
      <li
        :option_id="result.id"
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result.title }}
      </li>
    </ul>
  </div>

  <p>Chosen recipe: {{ chosenRecipe.title }}</p>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    isAsync: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    ...mapState(["recipeOptions", "chosenRecipe"]),
  },
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
      isLoading: false,
      arrowCounter: -1,
      chosenID: 0,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  watch: {
    recipeOptions: function (value) {
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isLoading = false;
      }
    },
  },
  methods: {
    ...mapMutations(["RESET", "SET_OPTIONS", "CHOOSE_RECIPE"]),
    searchForRecipes(searchTerm) {
      if (searchTerm) {
        const searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        const searchRequest = new Request(searchUrl);
        fetch(searchRequest)
          .then((response) => response.json())
          .then((data) => {
            this.SET_OPTIONS(data);
          });
      } else {
        this.RESET();
      }
    },
    setResult(result) {
      this.search = result.title;
      this.chosenID = result.id;
      this.arrowCounter = -1;
      this.isOpen = false;
      this.CHOOSE_RECIPE(this.chosenID);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1;
        this.isOpen = false;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.setResult(this.results[this.arrowCounter]);
    },
    onChange() {
      this.isOpen = true;
      this.$emit("input", this.search);
      if (this.isAsync) {
        this.isLoading = true;
        this.searchForRecipes(this.search);
        // use vuex to set the displayed list (see filterResults for reference) to the first 10 results
        // will need to use an ID to identify what recipe is chosen.
        this.isOpen = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
// TODO: https://webdevetc.com/programming-tricks/vue3/vue3-guides/vue-3-global-scss-sass-variables/
$beige: #eae7c6;
$light-green: #bccc9a;
$dark-green: darken($light-green, 40%);
$rose: #c37b89;
$dark-rose: darken($rose, 40%);
$light-blue: #d1e8e4;
$dark-blue: darken($light-blue, 50%);

.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  min-height: 1em;
  max-height: 6em;
  overflow: auto;
  background-color: $light-blue;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: $rose;
  color: white;
}
</style>
