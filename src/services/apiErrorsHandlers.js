export const getTranslateKeyByMessage = (message = '') => `identity.errors:${message}`;

export const getFirstErrorTitleFromResponse = response => {
  const {
    data: { errors },
  } = response;

  const errorKey = Object.keys(errors)[0];

  return getTranslateKeyByMessage(errors[errorKey]);
};
