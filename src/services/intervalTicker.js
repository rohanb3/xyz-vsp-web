const observers = [];
const intervalMS = 1000;

const tick = () => {
  if (self.observers.length > 0) {
    self.observers.forEach(observer => observer());
    self.startTick();
  }
};

export const startTick = () => {
  setTimeout(self.tick, self.intervalMS);
};

export const unsubscribeTicker = observer => {
  const removeIndex = self.observers.indexOf(observer);
  if (removeIndex !== -1) {
    self.observers = self.observers.slice(removeIndex, 1);
  }
};

export const subscribeTicker = observer => {
  const { length } = self.observers;
  self.observers.push(observer);

  if (self.observers.length > 0 && length === 0) {
    self.startTick();
  }

  return () => self.unsubscribeTicker(observer);
};

export const changeInterval = newIntervalMS => {
  self.intervalMS = newIntervalMS;
};

export const self = {
  observers,
  intervalMS,
  tick,
  startTick,
  unsubscribeTicker,
  subscribeTicker,
  changeInterval,
};
