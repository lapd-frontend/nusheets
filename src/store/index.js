import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // Global State variables
  state: {
    saved_data: null,
    theme: 'theme-light',
    c: {
      exp: null,
      eval: null,
      state: null
    }
  },

  // Getters for global State variables
  getters: {
    saved_data(state) {
      return state.saved_data;
    },
    theme(state) {
      return state.theme;
    },
    c_data(state) {
      return {
        exp: state.c.exp,
        eval: state.c.eval
      };
    },
    c_exp(state) {
      return state.c.exp;
    },
    c_eval(state) {
      return state.c.eval;
    }
  },

  // Modifiers for global State variables
  mutations: {
    // Store saved Sheet data to browser LocalStorage
    save(state, payload) {
      state.saved_data = payload;
      state.saved_data.s_data[state.saved_data.c_pos.row][
        state.saved_data.c_pos.col
      ].state = 0;
      localStorage.setItem('nusheets-data', JSON.stringify(state.saved_data));
      localStorage.setItem('nusheets-theme', JSON.stringify(state.theme));
      state.last_saved = new Date();
    },

    // Retrieve saved Sheet data from browser LocalStorage
    restore(state) {
      state.saved_data = JSON.parse(localStorage.getItem('nusheets-data'));
      state.theme = JSON.parse(localStorage.getItem('nusheets-theme'));
      if (!state.theme) state.theme = 'theme-light';
    },

    // Reset Sheet data and clear browser LocalStorage
    reset() {
      localStorage.removeItem('nusheets-data');
      localStorage.removeItem('nusheets-theme');
      location.reload();
    },

    // Toggle global theme styling
    toggleTheme(state) {
      state.theme =
        state.theme === 'theme-light' ? 'theme-dark' : 'theme-light';
      localStorage.setItem('nusheets-theme', JSON.stringify(state.theme));
    },

    // Update data for currently seleted cell
    update_c(state, c) {
      state.c = c;
    },
    update_c_exp(state, c_exp) {
      state.c.exp = c_exp;
    },
    update_c_eval(state, c_eval) {
      state.c.eval = c_eval;
    }
  }
});
