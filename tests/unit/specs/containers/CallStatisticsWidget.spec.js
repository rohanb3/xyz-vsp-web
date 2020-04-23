import CallStatisticsWidgets from '@/containers/CallStatisticsWidgets';
import { mount, createLocalVue } from '@vue/test-utils';
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
      callStatisticsCallbacksAnswered: () => 10,
      callStatisticsCallbacksMissed: () => 5,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('should show data callStatisticsAnswered + callStatisticsCallbacksAnswered from store', () => {
    const wrapper = mount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: s => s },
    });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = '95';
    expect(actual).toBe(expected);
  });

  it('should show data callStatisticsAbandoned + callStatisticsCallbacksMissed from store', () => {
    const wrapper = mount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: s => s },
    });
    const actual = wrapper.find('.right-data-font').text();
    const expected = '45';
    expect(actual).toBe(expected);
  });

  it('should show data callStatisticsAnswered from store', () => {
    const wrapper = mount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: s => s },
    });
    const actual = wrapper.find('.left-data-details .sub-sub-data').text();
    const expected = '85';
    expect(actual).toBe(expected);
  });

  it('should show data callStatisticsAbandoned from store', () => {
    const wrapper = mount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: s => s },
    });
    const actual = wrapper.find('.right-data-details .sub-sub-data').text();
    const expected = '40';
    expect(actual).toBe(expected);
  });

  it('should show data callStatisticsCallbacksAnswered from store', () => {
    const wrapper = mount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: s => s },
    });
    const actual = wrapper
      .findAll('.left-data-details .sub-sub-data')
      .at(1)
      .text();
    const expected = '10';
    expect(actual).toBe(expected);
  });

  it('should show data callStatisticsCallbacksMissed from store', () => {
    const wrapper = mount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: s => s },
    });
    const actual = wrapper
      .findAll('.right-data-details .sub-sub-data')
      .at(1)
      .text();
    const expected = '5';
    expect(actual).toBe(expected);
  });

  it('should show data (callStatisticsAnswered + callStatisticsAbandoned + callStatisticsCallbacksAnswered + callStatisticsCallbacksMissed) from store', () => {
    const wrapper = mount(CallStatisticsWidgets, {
      store,
      localVue,
      mocks: { $t: s => s },
    });
    const actual = wrapper.find('.offline-font').text();
    const expected = '140';
    expect(actual).toBe(expected);
  });
});
