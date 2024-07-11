import dayjs, { type Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(timezone);
dayjs.extend(utc);

export const datetimeInputFormat = 'YYYY-MM-DDTHH:mm';
export const TZ = 'America/Chicago';

/**
 * This function converts a date to a Day.js object in a specific timezone.
 *
 * @param {string | number | Date | Dayjs} date - The date to convert. This can be a string, a number, a Date object, or a Day.js object.
 *
 * @returns {Dayjs} The converted date as a Day.js object in the specified timezone.
 */
export function DateTZ(date?: string | number | Date | Dayjs) {
  // Convert the date to a Day.js object in the specified timezone
  return dayjs(date).tz(TZ);
}

const validRegex = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/;
/**
 * This function converts a datetime string to a Day.js object in a specific timezone, and sets the hour and minute.
 *
 * @param {string} localTime - The datetime string to convert.
 *
 * @returns {Dayjs} The converted datetime as a Day.js object in the specified timezone, with the hour and minute set.
 */
export function DateTZFromInput(localTime: string) {
  const isValid = validRegex.test(localTime);
  if (!isValid) {
    throw new Error('Must be a valid datetime string in the format YYYY-MM-DDTHH:mm');
  }

  // Extract the hour and minute from the datetime string
  const time = localTime.split('T')[1];

  const [hour, minutes] = time.split(':');

  // Convert the datetime string to a Day.js object in the specified timezone, and set the hour and minute
  return DateTZ(localTime).hour(Number(hour)).minute(Number(minutes));
}

const options: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour12: true,
  hour: 'numeric',
  year: 'numeric',
  minute: 'numeric',
  timeZone: TZ,
  timeZoneName: 'short',
};

/**
 * This function formats a date or datetime string for a specific timezone.
 *
 * @param {Date | string} date - The date or datetime string to format.
 *
 * @returns {string} The formatted date or datetime string.
 */
export function formatDatetimeTZ(date: Date | string) {
  // Define the options for formatting the date or datetime string

  // If the date is a string, convert it to a Date object and format it
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('en-US', options);
  }

  // If the date is a Date object, format it
  return date.toLocaleDateString('en-US', options);
}
