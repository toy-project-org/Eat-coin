import { Store } from 'vuex';

export interface Obj_app {
  id: number;
}

export interface HistoryItem {
  hid: number;
  title: string;
  amount: number;
  payment_date: string;
  category: {
    cid: number;
    name: string;
    type: string;
    image: string;
  };
}

export interface FormatHistoryItem {
  date: string;
  historyItemList: Array<HistoryItem>;
}

export interface SelectedDay {
  year: number;
  month: number;
  day: number;
}

declare module '@vue/runtime-core' {
  interface State {
    test_1: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
