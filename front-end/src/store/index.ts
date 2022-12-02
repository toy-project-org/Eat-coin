import { State } from 'vue';
import { createStore } from 'vuex';

export default createStore<State>({
  state: {
    test_1: 1,
  },
  getters: {},
  mutations: {
    setTestOne(state) {
      state.test_1 = 2;
    },
  },
  actions: {},
  modules: {},
});
