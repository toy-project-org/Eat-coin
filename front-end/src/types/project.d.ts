import { Store } from 'vuex';

export interface Obj_app {
  id: number;
}

export interface HistoryItem {
  hid: number;
  title: string;
  amount: number;
  payment_date: string;
  type: string;
  category: {
    cid: number;
    name: string;
    image: string;
  };
}

export interface HistoryDetailItem {
  hid?: number;
  title: string;
  amount: number;
  payment_date: string;
  type: string;
  category: {
    cid?: number;
    name: string;
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

export interface ChartItems {
  title: string;
  amount: number;
}

export interface CategoryBasicItem {
  id?: number;
  name: string;
  image: string;
}

export interface CategoryItem {
  cid?: number;
  name: string;
  image: string;
}

export interface AssetsItem {
  aid?: number;
  name: string;
  image: string;
}

export interface CategoryItemPost {
  name: string;
  image: string;
}

export interface CategoryMonthItem {
  category: string;
  account: string;
  image: string;
}

export interface AssetsMonthItem {
  asset: string;
  account: string;
  image: string;
}

export interface ChartMonthItem {
  title: string;
  account: string;
  image: string;
}

declare module '@vue/runtime-core' {
  interface State {
    test: string;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
