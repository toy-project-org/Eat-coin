import { State } from 'vue';
import { createStore } from 'vuex';

// const store = createStore<State>({
//   state() {
//     return {
//       test_1: 1,
//     };
//   },

//   getters: {},
//   mutations: {
//     func() {
//       //
//     },
//   },
//   actions: {},
//   modules: {},
// });

// export default store;

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
