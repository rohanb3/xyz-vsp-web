import OperatorsWidgets from '@/containers/OperatorsWidgets';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('OperatorsWidget:', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      operatorsOffline: () => 12,
      operatorsOnCall: () => 11,
      operatorsAvailable: () => 10,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('should show data operatorsOffline from store', () => {
    const wrapper = mount(OperatorsWidgets, { store, localVue, mocks: { $t: s => s } });
    const actual = wrapper.find('.offline-font').text();
    const expected = '12';
    expect(actual).toBe(expected);
  });

  it('should show data operatorsOnCall from store', () => {
    const wrapper = mount(OperatorsWidgets, { store, localVue, mocks: { $t: s => s } });
    const actual = wrapper.find('.real-time-cnt').text();
    const expected = '11';
    expect(actual).toBe(expected);
  });

  it('should show data operatorsAvailable from store', () => {
    const wrapper = mount(OperatorsWidgets, { store, localVue, mocks: { $t: s => s } });
    const actual = wrapper.find('.right-data-font').text();
    const expected = '10';
    expect(actual).toBe(expected);
  });
});
