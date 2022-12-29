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

export interface HistoryDetailItem {
  hid?: number;
  title: string;
  amount: number;
  payment_date: string;
  category: {
    cid?: number;
    name: string;
    type: string;
    image: string;
  };
  method: string;
  memo: string;
  isfixed: string | null;
}

export interface FormatHistoryItem {
  date: string /** xxxx-xx-xx */;
  historyItemList: Array<HistoryDetailItem>;
}

export interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

export interface DateMonth {
  year: number;
  month: number;
}

export interface DateMonthStr {
  year: string;
  month: string;
}

declare module '@vue/runtime-core' {
  interface State {
    test_1: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
