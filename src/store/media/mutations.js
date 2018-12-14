import { SET_AUDIO_CONTEXT } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_AUDIO_CONTEXT](state, value) {
    state.audioContext = value;
  },
  /* eslint-enable no-param-reassign */
};
