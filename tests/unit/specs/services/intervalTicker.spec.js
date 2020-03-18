import * as intervalTicker from '@/services/intervalTicker';

describe('intervalTicker:', () => {
  beforeEach(() => {
    intervalTicker.self.observers = [];
  });

  describe('subscribeTicker:', () => {
    it('should start ticker on adding first observer', () => {
      intervalTicker.self.startTick = jest.fn();

      intervalTicker.subscribeTicker(() => {});
      expect(intervalTicker.self.startTick).toHaveBeenCalled();
      expect(intervalTicker.self.observers.length).toBe(1);
    });
    it('should not start ticker on adding first observer', () => {
      intervalTicker.self.startTick = jest.fn();
      intervalTicker.self.observers = [() => {}];

      intervalTicker.subscribeTicker(() => {});

      expect(intervalTicker.self.observers.length).toBe(2);
      expect(intervalTicker.self.startTick).not.toHaveBeenCalled();
    });
    it('should return correct unsubscribe function', () => {
      const observer = jest.fn();
      intervalTicker.self.startTick = jest.fn();
      intervalTicker.self.unsubscribeTicker = jest.fn();

      const unsubscribe = intervalTicker.subscribeTicker(observer);
      unsubscribe();

      expect(intervalTicker.self.unsubscribeTicker).toHaveBeenCalledWith(observer);
    });
  });
  describe('unsubscribeTicker', () => {
    it('should remove observer from array if it presents there', () => {
      const observer = jest.fn();
      intervalTicker.self.observers = [observer, () => {}];

      intervalTicker.unsubscribeTicker(observer);

      expect(intervalTicker.self.observers.length).toBe(1);
    });
    it('should  not do anything if observer is not in the array', () => {
      const observer = jest.fn();
      intervalTicker.self.observers = [() => {}];
      intervalTicker.self.observers.slice = jest.fn();

      intervalTicker.unsubscribeTicker(observer);

      expect(intervalTicker.self.observers.length).toBe(1);
      expect(intervalTicker.self.observers.slice).not.toHaveBeenCalled();
    });
  });
  describe('tick:', () => {
    it('should call each observer if observers array is not empty', () => {
      const observer1 = jest.fn();
      const observer2 = jest.fn();
      intervalTicker.self.observers = [observer1, observer2];

      intervalTicker.self.tick();

      expect(observer1).toHaveBeenCalled();
      expect(observer2).toHaveBeenCalled();
    });
    it('should call startTick if observers array is not empty', () => {
      const observer1 = jest.fn();
      intervalTicker.self.startTick = jest.fn();
      intervalTicker.self.observers = [observer1];

      intervalTicker.self.tick();

      expect(observer1).toHaveBeenCalled();
      expect(intervalTicker.self.startTick).toHaveBeenCalled();
    });
    it('should not do anything if observers array is empty', () => {
      intervalTicker.self.startTick = jest.fn();
      intervalTicker.self.observers = [];

      intervalTicker.self.tick();

      expect(intervalTicker.self.startTick).not.toHaveBeenCalled();
    });
  });
  describe('startTick', () => {
    it('should call setTimeout with tick function and current interval', async () => {
      jest.useFakeTimers();
      intervalTicker.startTick();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(
        intervalTicker.self.tick,
        intervalTicker.self.intervalMS
      );
    });
  });
  describe('changeInterval', () => {
    it('should change interval of ticks', () => {
      intervalTicker.self.changeInterval(20000);

      expect(intervalTicker.self.intervalMS).toBe(20000);
    });
  });
});
