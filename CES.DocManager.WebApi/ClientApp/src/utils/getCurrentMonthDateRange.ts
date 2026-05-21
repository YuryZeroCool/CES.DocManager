import { getDaysInMonth } from 'date-fns';

export default function getCurrentMonthDateRange(referenceDate: Date = new Date()): {
  minDate: Date;
  maxDate: Date;
} {
  const minDate = new Date(referenceDate);
  minDate.setDate(1);

  const maxDate = new Date(referenceDate);
  maxDate.setDate(getDaysInMonth(referenceDate));

  return { minDate, maxDate };
}
