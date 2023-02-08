import { createStore } from "vuex";

import persistedstate from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      storeAdmin: [],
    };
  },
  mutations: {
    updateStoreAdmin(state, data) {
      state.storeAdmin = data;
    },
  },
  actions: {
    updateStoreAdmin({ commit }, item) {
      commit("updateStoreAdmin", item);
    },
  },
  plugins: [
    persistedstate({
      paths: ["storeAdmin"],
    }),
  ],
});

export default store;
