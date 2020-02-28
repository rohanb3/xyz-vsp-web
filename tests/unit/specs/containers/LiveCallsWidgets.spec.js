import LiveCallsWidgets from '@/containers/LiveCallsWidgets';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex)

describe('LiveCallsWidgets:', () => {

  let getters;
  let store;

  beforeEach(() => {
    getters = {
      activeCalls: () => ({ count: 13 }),
    }

    store = new Vuex.Store({
      getters,
    });
  })

  it('should show data from store', () => {
    const wrapper = shallowMount(LiveCallsWidgets, { store, localVue, mocks: { $t: () => {} } });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = getters.activeCalls().count.toString();
    expect(actual).toBe(expected);
  });
});
