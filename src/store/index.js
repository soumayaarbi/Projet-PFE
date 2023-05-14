import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      const response = await axios.get('/api/user');
      commit('setUser', response.data.user);
    },
  },
  getters: {
    user: (state) => state.user,
  },
});
