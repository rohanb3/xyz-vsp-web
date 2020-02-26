import ee from 'event-emitter';
import allOff from 'event-emitter/all-off';

const logs = true;

export default class Emitter {
  constructor() {
    this.emitter = ee();
  }

  subscribe(eventName, listener) {
    logs && console.log('Emitter.subscribe', eventName);
    this.emitter.on(eventName, listener);
    return () => this.unsubscribe(eventName, listener);
  }

  subscribeOnce(eventName, listener) {
    logs && console.log('Emitter.subscribeOnce', eventName);
    this.emitter.once(eventName, listener);
    return () => this.unsubscribe(eventName, listener);
  }

  unsubscribe(eventName, listener) {
    logs && console.log('Emitter.unsubscribe', eventName);
    return this.emitter.off(eventName, listener);
  }

  unsubscribeAll() {
    logs && console.log('Emitter.unsubscribeAll', eventName);
    allOff(this.emitter);
  }

  emit(eventName, ...args) {
    logs && console.log('Emitter.emit', eventName);
    this.emitter.emit(eventName, ...args);
  }
}
