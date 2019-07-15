import { checkExtension } from '@/services/twilio';
import { getUser } from '@/services/identityRepository';
import { getBranchInfo } from '@/services/branchesRepository';
import { log } from '@/services/sentry';
import { CHECK_EXTENSION_IS_INSTALLED, GET_CALL_CUSTOMER_DATA } from './actionTypes';
import { SET_EXTENSION_AVAILABILITY, SET_CALL_DATA } from './mutationTypes';

export default {
  async [CHECK_EXTENSION_IS_INSTALLED]({ commit }) {
    try {
      const installed = await checkExtension();
      commit(SET_EXTENSION_AVAILABILITY, installed);
    } catch (e) {
      // eslint-disable-next-line
      console.warn(
        'Error during checking extension foe screen sharing is installed.'
      );
    }
  },
  async [GET_CALL_CUSTOMER_DATA]({ commit }, peerId) {
    try {
      const customer = await getUser(peerId);
      commit(SET_CALL_DATA, { customer });
      const branch = await getBranchInfo(customer.branchId);
      commit(SET_CALL_DATA, { branch });
    } catch (e) {
      log('Getting call peer data failed');
    }
  },
};
