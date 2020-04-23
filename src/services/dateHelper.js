/* eslint-disable-next-line import/prefer-default-export */
// import moment from 'moment';
import moment from 'moment-timezone';
import { addSpaceBetweenNumbers } from './stylesHelper';

export function secondsToHuman(duration = 0) {
  if (!duration) {
    return '00:00:00';
  }

  let seconds = parseInt(duration % 60, 10);
  let minutes = parseInt((duration / 60) % 60, 10);
  let hours = parseInt(Math.floor(duration / 3600), 10);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

export function filterByDateRange(data = [], { startDate, endDate } = {}, byField = 'date') {
  return data.filter(item => {
    const itemDate = moment.utc(item[byField]);
    const isAfterStartDate =
      !startDate || itemDate.isAfter(startDate) || itemDate.isSame(startDate, 'day');
    const isBeforeEndDate =
      !endDate || itemDate.isBefore(endDate) || itemDate.isSame(endDate, 'day');

    return isAfterStartDate && isBeforeEndDate;
  });
}

export function secondsToMinutesSeconds(data, showZero) {
  let seconds = parseInt(data % 60, 10);
  let minutes = parseInt((data / 60) % 60, 10);

  minutes = minutes || showZero ? `${minutes}m` : '';
  seconds = seconds || showZero ? `${seconds}s` : '';

  return `${minutes} ${seconds}`.trim();
}

export function secondToMinutes(seconds) {
  if (!seconds && seconds !== 0) return null;
  const minutes = parseInt((seconds / 60) % 60, 10);

  return `${minutes} min`;
}

export function secondsToHoursMinutes(data = 0) {
  let minutes = parseInt((data / 60) % 60, 10);
  const hours = parseInt(Math.floor(data / 3600), 10);

  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}h ${minutes}m`.trim();
}

export function secondsToHoursMinutesSeconds(data = 0) {
  const seconds = parseInt(data % 60, 10);
  const minutes = parseInt((data / 60) % 60, 10);
  const hours = addSpaceBetweenNumbers(parseInt(Math.floor(data / 3600), 10));
  const formattedHours = addSpaceBetweenNumbers(hours);

  return `${formattedHours}h ${minutes}m ${seconds}s`.trim();
}

export function getStartOfCurrentDayUTC() {
  return moment()
    .tz('America/Los_Angeles')
    .startOf('day')
    .utc()
    .format();
}

export function secondsToMinutesAndSeconds(duration = 0) {
  if (!duration) {
    return '00:00';
  }

  let seconds = parseInt(duration % 60, 10);
  let minutes = parseInt((duration / 60) % 60, 10);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}

export const correctDateFault = (date, fault, units = 'milliseconds') =>
  moment
    .utc(date)
    .add(fault, units)
    .format();

export const getDifference = (dateFrom, dateTo, units = 'milliseconds') =>
  moment.utc(dateFrom).diff(moment.utc(dateTo), units);
