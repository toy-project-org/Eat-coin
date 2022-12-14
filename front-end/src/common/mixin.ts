import { DateMonth, FormatHistoryItem, HistoryDetailItem, SelectedDate } from '@/types/project';
import * as api from '@/api/app';

const MixinCommon = {
  data() {
    return {
      /* data */
    };
  },

  methods: {
    formatAmount(amount: number) {
      return amount.toLocaleString('ko-KR');
    },

    formatYearAndMonthHeader(currDateMonth: DateMonth) {
      const year = currDateMonth.year.toString();
      const month = currDateMonth.month < 10 ? `0${currDateMonth.month}` : `${currDateMonth.month}`;
      return { year, month };
    },

    setYearAndMonth(currDateMonth: DateMonth, m: number) {
      currDateMonth.month += m;

      if (currDateMonth.month < 1 || currDateMonth.month > 12) {
        const date = new Date(currDateMonth.year, currDateMonth.month - 1);
        currDateMonth.year = date.getFullYear();
        currDateMonth.month = date.getMonth() + 1;
      }
    },

    // e.g. 2022, 12, 1 > 12월 01일 (목)
    formatBasicDate(date: SelectedDate) {
      const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      const day = new Date(date.year, date.month - 1, date.day);
      const dayOfWeek = WEEKDAY[day.getDay()];

      const formatMonth = date.month < 10 ? `0${date.month}` : `${date.month}`;
      const formatDay = date.day < 10 ? `0${date.day}` : `${date.day}`;
      const newDateFormat = `${formatMonth}월 ${formatDay}일, ${dayOfWeek}`;
      return newDateFormat;
    },

    // e.g. 2022-12-01 > 12월 01일 (목)
    formatStrDate(date: string) {
      const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      const day = new Date(`${date}`);
      const dayOfWeek = WEEKDAY[day.getDay()];

      const dateList = date.split('-');
      const newDateFormat = `${dateList[1]}월 ${dateList[2]}일, ${dayOfWeek}`;
      return newDateFormat;
    },

    addNewDate(data: HistoryDetailItem) {
      const addHistoryDate = {
        date: '',
        historyItemList: [] as Array<HistoryDetailItem>,
      };
      addHistoryDate.date = data.payment_date;
      addHistoryDate.historyItemList.push(data);

      return addHistoryDate;
    },

    addHistoryData(list: Array<FormatHistoryItem>, data: HistoryDetailItem) {
      const formatDataList = list.find(formatData => formatData.date === data.payment_date);

      if (formatDataList === undefined) {
        list.push(this.addNewDate(data));
      } else {
        formatDataList.historyItemList.push(data);
      }
    },

    async setMonthInAndOut(date: DateMonth) {
      const formatMonth = date.month < 10 ? `0${date.month}` : `${date.month}`;
      const dateParam = `${date.year}-${formatMonth}`;
      return await api.getMonthAmount(dateParam);
    },
  },
};

export default MixinCommon;
