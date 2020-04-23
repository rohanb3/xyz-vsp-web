import WaitingCallsWidgets from '@/containers/WaitingCallsWidgets';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('WaitingCallsWidgets:', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      allWaitingCallsCount: () => 250,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('should show data from store', () => {
    const wrapper = mount(WaitingCallsWidgets, {
      store,
      localVue,
      mocks: {
        $t: s => s,
      },
    });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = '250';
    expect(actual).toBe(expected);
  });
});
