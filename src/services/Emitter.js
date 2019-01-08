import ee from 'event-emitter';

export default class Emitter {
  constructor() {
    this.emitter = ee();
  }

  subscribe(eventName, listener) {
    this.emitter.on(eventName, listener);
    return () => this.unsubscribe(eventName, listener);
  }

  unsubscribe(eventName, listener) {
    return this.emitter.off(eventName, listener);
  }

  emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }
}
