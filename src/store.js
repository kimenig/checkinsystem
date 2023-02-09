import { createStore } from "vuex";

import persistedstate from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      storeAdmin: [],
      storeUser: [],
      isLoggedIn: false,
      sessionTime: 60,
    };
  },
  mutations: {
    updateStoreAdmin(state, data) {
      state.storeAdmin = data;
    },
    /*updateStoreUser(state, data) {
      state.storeUser = data;
    },*/
    login(state, data) {
      state.isLoggedIn = true;
      state.storeUser = data;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.storeUser = [];
    },
    resetSessionTime(state) {
      state.sessionTime = 60;
    },
    decreaseSessionTime(state) {
      state.sessionTime--;
    },
    maintainSessionTime(state) {
      state.sessionTime = 60;
    },
  },
  actions: {
    updateStoreAdmin({ commit }, item) {
      commit("updateStoreAdmin", item);
    },
    /*updateStoreUser({ commit }, item) {
      commit("updateStoreUser", item);
    },*/
    login({ commit }, item) {
      commit("login", item);
      commit("resetSessionTime");
    },
    logout({ commit }, item) {
      commit("logout", item);
      commit("resetSessionTime");
    },
    maintainSessionTime({ commit }) {
      commit("maintainSessionTime");
    },
  },
  plugins: [
    persistedstate({
      paths: ["storeAdmin", "storeUser", "isLoggedIn", "sessionTime"],
    }),
    (store) => {
      setInterval(() => {
        store.commit("decreaseSessionTime");
        if (store.state.sessionTime < 0) {
          store.dispatch("logout");
        }
      }, 1000);
    },
  ],
});

export default store;
