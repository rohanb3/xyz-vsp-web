export default {
  inserted() {
    document.querySelector('.application--wrap').classList.add('blurred');
    setTimeout(() => {
      document.querySelector('.application > .v-overlay--active').classList.add('no-bg-color');
    });
  },
  unbind() {
    document.querySelector('.application--wrap').classList.remove('blurred');
    setTimeout(() => {
      document.querySelector('.application > .v-overlay--active').classList.remove('no-bg-color');
    });
  },
};
