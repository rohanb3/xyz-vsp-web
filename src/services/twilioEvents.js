import Emitter from '@/services/Emitter';

const REMOTE_TRACKS_ADDED = 'REMOTE_TRACKS_ADDED';
const REMOTE_TRACKS_REMOVED = 'REMOTE_TRACKS_REMOVED';
const LOCAL_TRACKS_ADDED = 'LOCAL_TRACKS_ADDED';
const LOCAL_TRACKS_REMOVED = 'LOCAL_TRACKS_REMOVED';
const PARTICIPANT_CONNECTED = 'PARTICIPANT_CONNECTED';
const PARTICIPANT_DISCONNECTED = 'PARTICIPANT_DISCONNECTED';

export const TWILIO_EVENTS = {
  REMOTE_TRACKS_ADDED,
  REMOTE_TRACKS_REMOVED,
  LOCAL_TRACKS_ADDED,
  LOCAL_TRACKS_REMOVED,
  PARTICIPANT_CONNECTED,
  PARTICIPANT_DISCONNECTED,
};

export default new Emitter();
