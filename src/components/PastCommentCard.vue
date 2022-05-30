<template>
  <div class="past-comment">
    <h2>{{ title }}</h2>
    <star-rating :rating="rating" />
    <p>{{ comment }}</p>
  </div>
</template>

<script>
import StarRating from "./StarRating.vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  components: { StarRating },
};
</script>
