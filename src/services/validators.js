import i18n from '@/i18n';

const ONLY_DIGITS_REGEX = /^[\d]+$/;
const ONLY_DIGITS_AND_DOTS_REGEX = /^[0-9.]+$/;

export const validateFieldCantBeEmpty = (message = 'field.cant.be.empty') => text =>
  !!text || i18n.t(message);

export const validateOnlyDigitsAndDots = (
  message = 'field.must.consist.only.digits.and.dots'
) => text => ONLY_DIGITS_AND_DOTS_REGEX.test(text) || i18n.t(message);

export const validateOnlyDigits = (message = 'field.must.consist.only.digits') => number =>
  ONLY_DIGITS_REGEX.test(number) || i18n.t(message);
