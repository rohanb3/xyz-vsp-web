import { checkExtension } from '@/services/twilio';
import { CHECK_EXTENSION_IS_INSTALLED } from './actionTypes';
import { SET_EXTENSION_AVAILABILITY } from './mutationTypes';

export default {
  async [CHECK_EXTENSION_IS_INSTALLED]({ commit }) {
    const installed = await checkExtension();

    commit(SET_EXTENSION_AVAILABILITY, installed);
  },
};
