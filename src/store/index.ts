import { createStore } from "vuex";
import teachersHoursApi from "./modules/teachersHoursApi";

const store = createStore({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    teachersHoursApi,
  },
});
export default store;
