<template>
  <select class="home-page__input" @change="getValue" >
    <option  value="select">{{ selectText }}</option>
    <option v-for="option in options" :key="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  options: {
    type: Object,
    required: true,
  },
  selectText: {
    type: String,
    default: "select character by",
  },
});

const emit = defineEmits(["selectsOptions"]);

function getValue(item) {
  emit("selectsOptions", item.target.value);
}
</script>


