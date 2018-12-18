import moment from 'moment';

const daysShort = Array(7)
  .fill(1)
  .map((_, i) =>
    moment
      .utc()
      .isoWeekday(i + 1)
      .format('dd')
      .slice(0, 1)
  );

export default {
  daysShort,
};
