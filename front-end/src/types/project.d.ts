import { Store } from 'vuex';

export interface Obj_app {
  id: number;
}

declare module '@vue/runtime-core' {
  interface State {
    test_1: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
