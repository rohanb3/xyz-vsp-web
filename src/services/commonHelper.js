/* eslint-disable import/prefer-default-export */
export function getPercentage(num, amount) {
  if (num && amount) {
    return Math.round((num / amount) * 100);
  }
  return 0;
}
/* eslint-enable import/prefer-default-export */
