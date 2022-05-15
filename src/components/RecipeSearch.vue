<template>
  <div class="autocomplete">
    <input
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      type="text"
    />
    <ul v-show="isOpen" class="autocomplete-results">
      <li v-if="isLoading" class="loading">Finding recipes...</li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
  </div>

  <p>Chosen recipe: {{ chosen }}</p>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
      isLoading: false,
      chosen: "",
      arrowCounter: -1,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  watch: {
    items: function (value) {
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isLoading = false;
      }
    },
  },
  methods: {
    setResult(result) {
      this.search = result;
      this.chosen = result;
      this.isOpen = false;
    },
    filterResults() {
      this.results = this.items.filter(
        (item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1;
        this.isOpen.false;
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
      this.search = this.results[this.arrowCounter];
      this.chosen = this.search;
      this.arrowCounter = -1;
      this.isOpen = false;
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
      this.$emit("input", this.search);
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
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
