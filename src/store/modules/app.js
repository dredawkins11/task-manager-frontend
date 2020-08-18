const state = {
  app: {
    log_state: sessionStorage.getItem("log") === "false" ? false : true,
    register: false,
    trigger: 0,
  },
};

const getters = {
  appState: (state) => state.app,
};

const actions = {
  logIn({ commit }) {
    sessionStorage.setItem("log", "true");
    commit("logInM");
  },
  logOut({ commit }) {
    sessionStorage.setItem("log", "false");
    commit("logOutM");
  },
  triggerChange({ commit }) {
    commit("triggerChangeM");
  },
  toggleRegister({ commit }) {
    commit("toggleRegisterM");
  },
};

const mutations = {
  logInM: (state) => (state.app.log_state = true),
  logOutM: (state) => (state.app.log_state = false),
  triggerChangeM: (state) => state.app.trigger++,
  toggleRegisterM: (state) => (state.app.register = !state.app.register),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
