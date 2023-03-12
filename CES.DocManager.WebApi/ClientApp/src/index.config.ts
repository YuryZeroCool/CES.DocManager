import { Dayjs } from 'dayjs';
import { IPeriod } from './types/ReportTypes';

const countCurrentPeriod = (period: Dayjs | null): IPeriod => {
  let currentMonth = 0;
  let currentYear = 0;
  let currentPeriod: IPeriod = {
    month: 0,
    year: 0,
  };
  if (period) {
    currentMonth = period.month();
    currentYear = period.year();
    currentPeriod = {
      month: currentMonth + 1,
      year: currentYear,
    };
  }
  return currentPeriod;
};

export default countCurrentPeriod;
