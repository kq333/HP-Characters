import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    fetchedCharactersData: [],
    byStaffAndStudentName: ["hogwartsStaff", "hogwartsStudent"],
    staffAndStudentName: "select",
    isButtonActive: false,
    inputSearchValue: "",
    selectOptionValue: "select",
  },
  getters: {
    getFilterHouses: (state) => {
      return [
        ...new Set(state.fetchedCharactersData.map((elem) => elem.house)),
      ];
    },

    getNumberItems: (state, getters) => {
      return getters.getSearchValue.length;
    },

    getFilterDataByStaffAndStudent: () => (arr, param) => {
      return arr.filter((item) => item[param]);
    },

    getSearchValue: (state, getters) => {

      const filterCharacterHouse = state.fetchedCharactersData.filter(
        (elem) =>
          elem.house == state.selectOptionValue &&
          elem.name
            .toLowerCase()
            .includes(
              state.isButtonActive == true
                ? state.inputSearchValue.toLowerCase()
                : ""
            )
      );

      const filterCharacterName = state.fetchedCharactersData.filter(
        (elem) =>
          elem.name &&
          elem.name
            .toLowerCase()
            .includes(
              state.isButtonActive == true
                ? state.inputSearchValue.toLowerCase()
                : ""
            )
      );

      if (
        state.selectOptionValue == !"select" ||
        state.staffAndStudentName == !"select"
      ) {
        return filterCharacterName;
      }

      if (
        state.selectOptionValue == "select" &&
        state.staffAndStudentName == "select"
      ) {
        return filterCharacterName;
      }

      if (
        state.staffAndStudentName == !"select" ||
        state.selectOptionValue == "select"
      ) {
        return getters.getFilterDataByStaffAndStudent(
          filterCharacterName,
          state.staffAndStudentName
        );
      }

      if (state.staffAndStudentName == "select") {
        return filterCharacterHouse;
      } else {
        return getters.getFilterDataByStaffAndStudent(
          filterCharacterHouse,
          state.staffAndStudentName
        );
      }
    },
  },

  mutations: {
    ADD_FETCHED_DATA(state, payload) {
      const sortData = payload.sort((a, b) => a.name.localeCompare(b.name));

      function validateObject(arr, param, name) {
        const checkValue = arr.map((elem) =>
          elem[param] == "" ? { ...elem, [param]: name } : elem
        );
        state.fetchedCharactersData = checkValue;
      }

      validateObject(sortData, "house", "Homeless");
      validateObject(
        state.fetchedCharactersData,
        "image",
        require("../assets/image/avatarIcon.svg")
      );
      validateObject(state.fetchedCharactersData, "dateOfBirth", "Unknown");
    },

    SET_BTN_EVENT_CLICK(state, payload) {
      state.isButtonActive = payload;
    },
    SET_INPUT_VALUE(state, payload) {
      state.inputSearchValue = payload;
    },

    SET_SELECTED_OPTION_VALUE(state, payload) {
      state.selectOptionValue = payload;
    },

    SET_SELECTED_OPTION_BY_STAFF_STUDENT(state, payload) {
      state.staffAndStudentName = payload;
    },

    UPDATE_STATE(state, payload){
      Object.assign(state, payload);
    }
  },
  actions: {
    async getValue({ commit }) {
      try {
        const fetchData = await axios.get(
          "https://hp-api.herokuapp.com/api/characters"
        );

        commit("ADD_FETCHED_DATA", fetchData.data.slice(0, 33));
      } catch (error) {
        console.log(error);
      }
    },

    btnClicked({ commit }, payload) {
      commit("SET_BTN_EVENT_CLICK", payload);
    },

    inputValue({ commit }, payload) {
      commit("SET_INPUT_VALUE", payload);
    },

    selectOptionValue({ commit }, payload) {
      commit("SET_SELECTED_OPTION_VALUE", payload);
    },
    selectOptionByStaffValue({ commit }, payload) {
      commit("SET_SELECTED_OPTION_BY_STAFF_STUDENT", payload);
    },

    async LocalStorageState({ commit }) {
      const data = JSON.parse(localStorage.getItem("storeState"));
      commit("UPDATE_STATE", data);
    },
  },
  modules: {},
});
