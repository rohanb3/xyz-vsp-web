/* eslint-disable */
import qs from 'qs';

export function paramsSerializer(paramList) {
  return qs.stringify(paramList, { skipNulls: true, arrayFormat: 'repeat' });
}
