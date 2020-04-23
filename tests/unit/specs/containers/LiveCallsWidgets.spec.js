import LiveCallsWidgets from '@/containers/LiveCallsWidgets';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('LiveCallsWidgets:', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      activeCallsCount: () => 300,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('should show data from store', () => {
    const wrapper = mount(LiveCallsWidgets, { store, localVue, mocks: { $t: s => s } });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = '300';
    expect(actual).toBe(expected);
  });
});
