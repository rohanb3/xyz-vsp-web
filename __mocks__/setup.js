window.navigator.mediaDevices = {
  getSupportedConstraints() {
    return {
      mediaSource: true,
    };
  },
};
