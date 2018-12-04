import { INSERT_COMPANIES } from './mutationTypes';

export default {
  [INSERT_COMPANIES](state, companies) {
    /* eslint-disable-next-line no-param-reassign */
    const test = companies.map(company => ({
      ...company,
      id: Date.now() + Math.random(),
      amount: String(Math.random() * Date.now()).slice(0, 5),
    }));
    state.customers.push(...test);
  },
};
