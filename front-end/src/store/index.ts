import { State } from 'vue';
import { createStore } from 'vuex';

export default createStore<State>({
  state: {
    test: '',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
