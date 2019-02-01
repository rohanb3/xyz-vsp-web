import { CALLS_TABLE } from '@/constants/tablesNames';

export default {
  callsTableDateRange(state) {
    return state[CALLS_TABLE].dateRange;
  },
};
