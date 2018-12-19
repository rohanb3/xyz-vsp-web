/* eslint-disable-next-line import/prefer-default-export */
import moment from 'moment';

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
