<template>
  <input
    type="text"
    class="home-page__input"
    v-model="inputValues"
    @click="resetInputValue"
    placeholder="search character"
  />
</template>

<script setup>
import { defineEmits, ref, watch } from "vue";

const emit = defineEmits(["inputValue", "resetSearchBtn"]);
const inputValues = ref(null);

watch(inputValues, () => {
  inputValue();
});

function inputValue() {
  emit("inputValue", inputValues.value);
}

function resetInputValue() {
  inputValues.value = "";
  emit("inputValue", "");
  emit("resetSearchBtn", false);
}
</script>
