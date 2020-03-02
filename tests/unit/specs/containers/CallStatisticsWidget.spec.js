import CallStatisticsWidgets from '@/containers/CallStatisticsWidgets';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CallStatisticsWidget:', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      callStatisticsAnswered: () => ({ total: 85 }),
      callStatisticsAbandoned: () => ({ total: 40 }),
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('should show data callStatisticsAnswered from store', () => {
    const wrapper = shallowMount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: () => {} },
    });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = '85';
    expect(actual).toBe(expected);
  });

  it('should show data callStatisticsAbandoned from store', () => {
    const wrapper = shallowMount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: () => {} },
    });
    const actual = wrapper.find('.abandoned-font').text();
    const expected = '40';
    expect(actual).toBe(expected);
  });

  it('should show data (callStatisticsAnswered + callStatisticsAbandoned) from store', () => {
    const wrapper = shallowMount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: () => {} },
    });
    const actual = wrapper.find('.total-font').text();
    const expected = '125';
    expect(actual).toBe(expected);
  });
});
