/* eslint-disable import/prefer-default-export */
export function getPercentage(num, amount, precision = 0) {
  if (num && amount) {
    const result = (num / amount) * 100;
    return result.toFixed(precision);
  }
  return 0;
}
/* eslint-enable import/prefer-default-export */
