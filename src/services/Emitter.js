import ee from 'event-emitter';
import allOff from 'event-emitter/all-off';

export default class Emitter {
  constructor() {
    this.emitter = ee();
  }

  subscribe(eventName, listener) {
    this.emitter.on(eventName, listener);
    return () => this.unsubscribe(eventName, listener);
  }

  subscribeOnce(eventName, listener) {
    this.emitter.once(eventName, listener);
    return () => this.unsubscribe(eventName, listener);
  }

  unsubscribe(eventName, listener) {
    return this.emitter.off(eventName, listener);
  }

  unsubscribeAll() {
    allOff(this.emitter);
  }

  emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }
}
