export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function addSpaceBetweenNumbers(number) {
  return number ? number.toLocaleString('ru-RU') : '';
}

function getFirstLetter(str) {
  return str && str.split ? str.split('')[0] : '';
}

export function getInitials(firstName = '', lastName = '') {
  return `${getFirstLetter(firstName)}${getFirstLetter(lastName)}`;
}
