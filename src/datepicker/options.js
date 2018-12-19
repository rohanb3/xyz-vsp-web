import moment from 'moment';

const daysShort = Array(7)
  .fill(1)
  .map((_, i) =>
    moment
      .utc()
      .isoWeekday(i + 1)
      .format('dd')
      .toLowerCase()
      .slice(0, 1)
  )
  .map((day, i, self) => (self.slice(i + 1).includes(day) ? day.toUpperCase() : day));

export default {
  daysShort,
  colors: {
    selected: '#398ffb',
    inRange: '#d4ebfe',
  },
};
