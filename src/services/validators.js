import i18n from '@/i18n';

const ONLY_DIGITS_REGEX = /^[\d]+$/;
const ONLY_DIGITS_AND_DOTS_REGEX = /^[0-9.]+$/;
const ONLY_DIGITS_AND_DOTS_AND_DASH_REGEX = /^[0-9.-]+$/;
const PHONE_FIELD_REGEX = /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})+$/;

export const validateFieldCantBeEmpty = (message = 'field.cant.be.empty') => text =>
  !!text || i18n.t(message);

export const validateOnlyDigitsAndDots = (
  message = 'field.must.consist.only.digits.and.dots'
) => text => ONLY_DIGITS_AND_DOTS_REGEX.test(text) || i18n.t(message);

export const validateOnlyDigits = (message = 'field.must.consist.only.digits') => number =>
  ONLY_DIGITS_REGEX.test(number) || i18n.t(message);

export const validateOnlyDigitsAndDotsAndDash = (
  message = 'field.must.consist.only.digits.and.dots.and.dash'
) => number => ONLY_DIGITS_AND_DOTS_AND_DASH_REGEX.test(number) || i18n.t(message);

export const validatePhoneField = (message = 'incorrect.phone.number') => phoneNumber =>
  PHONE_FIELD_REGEX.test(phoneNumber) || i18n.t(message);
