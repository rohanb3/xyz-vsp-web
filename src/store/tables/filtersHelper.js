import { ENTITY_TYPES } from '@/constants';

const { CALLS } = ENTITY_TYPES;

const filters = {
  [CALLS]: {},
};

export default itemType => ({ ...filters[itemType] } || {});
