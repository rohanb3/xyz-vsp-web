export function addBackgroundBlur() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.add('blurred');
  }
}

export function removeBackgroundBlur() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.remove('blurred');
  }
}

export function addBackgroundShadow() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.add('shadow-overlay');
  }
}

export function removeBackgroundShadow() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.remove('shadow-overlay');
  }
}
