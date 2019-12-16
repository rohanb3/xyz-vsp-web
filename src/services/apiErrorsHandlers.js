import { BE_ERROR_MESSAGES_TRANSLATION_MAP } from '../constants';

export const getFirstErrorTitleFromResponse = (response, defaultTitle = '') => {
  const {
    data: { errors },
  } = response;

  const errorKey = Object.keys(errors)[0];

  return BE_ERROR_MESSAGES_TRANSLATION_MAP[errors[errorKey]] || defaultTitle;
};

export default { getFirstErrorTitleFromResponse };
