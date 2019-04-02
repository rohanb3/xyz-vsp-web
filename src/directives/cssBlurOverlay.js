export default {
  inserted() {
    document.querySelector('.application--wrap').classList.add('blurred');
  },
  unbind() {
    document.querySelector('.application--wrap').classList.remove('blurred');
  },
};
