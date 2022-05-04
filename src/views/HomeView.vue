<template>
  <div class="home-page">
    <header class="home-page__header">
      <h1>HP CHARACTER BROWSER</h1>
      <p>Meet the characters of the HP novel</p>
    </header>
    <main class="home-page__container">
      <section class="home-page__search-content">
        <div class="home-page__inputs">
          <div class="home-page__input-tag">
            <InputComponent
              @inputValue="inputValue"
              @resetSearchBtn="resetSearchBtn"
            />
          </div>
          <div class="home-page__input-tag">
            <SelectOption
              :options="filteredHouses"
              @selectsOptions="selectOptionValue"
            />
          </div>
          <div class="home-page__input-tag">
            <SelectOption
              :options="byStaffAndStudentName"
              @selectsOptions="selectOptionStaff"
              :selectText="'select by'"
            />
          </div>
          <div class="home-page__search-tag">
            <ButtonComponent
              :clickEvent="searchCharacter"
              :inputCharacterLength="inputCharacterLength"
            />
          </div>
        </div>
        <div class="home-page__number-items">
          Characters number: ({{ itemsNumber }})
        </div>
      </section>

      <section class="home-page__content-card">
        <CharacterComponent :charactersData="charactersData" />
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import CharacterComponent from "@/components/CharacterComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import SelectOption from "@/components/SelectOption.vue";

onMounted(() => {
  store.dispatch("getValue");
  store.dispatch("LocalStorageState");
});
const store = useStore();

store.subscribe((mutation, state) => {
  localStorage.setItem("storeState", JSON.stringify(state));
});

const charactersData = computed(() => store.getters.getSearchValue);
const filteredHouses = computed(() => store.getters.getFilterHouses);
const byStaffAndStudentName = computed(() => store.state.byStaffAndStudentName);
const itemsNumber = computed(() => store.getters.getNumberItems);
const inputCharacterLength = computed(() => store.state.inputSearchValue);

function searchCharacter() {
  store.dispatch("btnClicked", true);
}

function inputValue(payload) {
  store.dispatch("inputValue", payload);
}

function resetSearchBtn(payload) {
  store.dispatch("btnClicked", payload);
}

function selectOptionValue(payload) {
  store.dispatch("selectOptionValue", payload);
}

function selectOptionStaff(payload) {
  store.dispatch("selectOptionByStaffValue", payload);
}
</script>
