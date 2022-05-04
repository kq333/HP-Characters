<template>
  <div class="character-card" v-for="item in charactersData" :key="item">
    <div class="character-card__card">
      <div class="character-card__image">
        <img :src="item.image" :alt="item.name" />
      </div>
      <div class="character-card__name">{{ item.name }}</div>
      <div class="character-card__day-of-birth">{{ item.dateOfBirth }}</div>
      <div class="character-card__character-house">{{ item.house }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  charactersData: {
    type: Object,
    required: true,
  },
});
</script>
