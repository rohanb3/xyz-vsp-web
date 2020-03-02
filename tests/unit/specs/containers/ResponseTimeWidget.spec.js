import ResponseTimeWidgets from '@/containers/ResponseTimeWidgets';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ResponseTimeWidget:', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      callStatisticsAnswered: () => ({ averageWaitingDuration: 21, maxWaitingDuration: 45 }),
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('should show data callStatisticsAnswered.averageWaitingDuration from store', () => {
    const wrapper = shallowMount(ResponseTimeWidgets, { store, localVue, mocks: { $t: () => {} } });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = '00:21';
    expect(actual).toBe(expected);
  });

  it('should show data callStatisticsAnswered.maxWaitingDuration from store', () => {
    const wrapper = shallowMount(ResponseTimeWidgets, { store, localVue, mocks: { $t: () => {} } });
    const actual = wrapper.find('.longest-font').text();
    const expected = '00:45';
    expect(actual).toBe(expected);
  });
});
