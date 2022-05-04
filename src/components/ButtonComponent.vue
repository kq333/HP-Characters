<template>
  <button
    :disabled="inputCharacterLength.length <= 2"
    :class="{
      'home-page__search-btn--changeColor': inputCharacterLength.length >= 3,
    }"
    class="home-page__search-btn"
    type="button"
    @click="clickEvent"
  >
    <span class="material-icons">
      {{ text }}
    </span>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  clickEvent: {
    type: Function,
  },
  text: {
    type: String,
    default: "search",
  },
  inputCharacterLength: {
    type: String,
  },
});
</script>
