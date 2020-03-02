import WaitingCallsWidgets from '@/containers/WaitingCallsWidgets';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('WaitingCallsWidgets:', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      waitingCallsCount: () => 250,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('should show data from store', () => {
    const wrapper = shallowMount(WaitingCallsWidgets, { store, localVue, mocks: { $t: () => {} } });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = '250';
    expect(actual).toBe(expected);
  });
});
