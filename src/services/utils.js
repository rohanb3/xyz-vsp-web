// eslint-disable-next-line import/prefer-default-export
export function imageEncode(arrayBuffer) {
  const b64encoded = btoa(
    new Uint8Array(arrayBuffer).reduce((p, c) => p + String.fromCharCode(c), '')
  );

  return `data:image/jpeg;base64,${b64encoded}`;
}

export const addBackground = selector => {
  const wrapper = document.querySelector(`.${selector}`);

  if (wrapper) {
    wrapper.classList.add('black-bg');
  }
};

export const removeBackground = selector => {
  const wrapper = document.querySelector(`.${selector}`);

  if (wrapper) {
    wrapper.classList.remove('black-bg');
  }
};
