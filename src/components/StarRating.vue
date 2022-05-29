<template>
  <div class="star-container">{{ starsEmoji }}</div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    starsEmoji() {
      return "\u2605".repeat(this.rating) + "\u2606".repeat(5 - this.rating);
    },
  },
};
</script>
