let observers = [];

let intervalMS = 1000;

const startTick = () => {
  setTimeout(() => {
    if (observers.length > 0) {
      observers.forEach(observer => observer());
      startTick();
    }
  }, intervalMS);
};

export const unsubscribeTicker = observer => {
  const removeIndex = observers.indexOf(observer);
  if (removeIndex !== -1) {
    observers = observers.slice(removeIndex, 1);
  }
};

export const subscribeTicker = observer => {
  const { length } = observers;
  observers.push(observer);

  if (observers.length > 0 && length === 0) {
    startTick();
  }

  return () => unsubscribeTicker(observer);
};

export const changeInterval = newIntervalMS => {
  intervalMS = newIntervalMS;
};
