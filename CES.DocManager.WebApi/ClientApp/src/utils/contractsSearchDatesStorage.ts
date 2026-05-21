import { format, isValid, parse } from 'date-fns';

import getCurrentMonthDateRange from 'utils/getCurrentMonthDateRange';

const MIN_DATE_KEY = 'contractsSearchMinDate';
const MAX_DATE_KEY = 'contractsSearchMaxDate';
const DATE_STORAGE_FORMAT = 'yyyy-MM-dd';

function parseStoredDate(value: string | null): Date | null {
  if (!value) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = parse(value, DATE_STORAGE_FORMAT, new Date());
    return isValid(date) ? date : null;
  }

  const legacyDate = new Date(value);
  if (!isValid(legacyDate)) {
    return null;
  }

  return new Date(legacyDate.getFullYear(), legacyDate.getMonth(), legacyDate.getDate());
}

export function loadContractsSearchDatesFromStorage(): { minDate: Date; maxDate: Date } | null {
  const minDate = parseStoredDate(localStorage.getItem(MIN_DATE_KEY));
  const maxDate = parseStoredDate(localStorage.getItem(MAX_DATE_KEY));

  if (!minDate || !maxDate) {
    return null;
  }

  return { minDate, maxDate };
}

export function getInitialContractsSearchDates(): { minDate: Date; maxDate: Date } {
  return loadContractsSearchDatesFromStorage() ?? getCurrentMonthDateRange();
}

export function saveContractsSearchDatesToStorage(minDate: Date, maxDate: Date): void {
  localStorage.setItem(MIN_DATE_KEY, format(minDate, DATE_STORAGE_FORMAT));
  localStorage.setItem(MAX_DATE_KEY, format(maxDate, DATE_STORAGE_FORMAT));
}
