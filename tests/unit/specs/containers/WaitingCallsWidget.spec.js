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
      waitingCalls: () => ({ count: 12 }),
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('should show data from store', () => {
    const wrapper = shallowMount(WaitingCallsWidgets, { store, localVue, mocks: { $t: () => {} } });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = getters.waitingCalls().count.toString();
    expect(actual).toBe(expected);
  });
});
