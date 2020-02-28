import 'jest-localstorage-mock';
import * as operatorFeedback from '@/services/operatorFeedback';
import * as callRepository from '@/services/callRepository';

const FEEDBACKS_TO_SAVE = 'FEEDBACKS_TO_SAVE';

xdescribe('operatorFeedback: ', () => {
  beforeEach(() => {
    localStorage.removeItem(FEEDBACKS_TO_SAVE);
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.clear();
    callRepository.saveFeedback = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    localStorage.removeItem(FEEDBACKS_TO_SAVE);
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.clear();
    jest.restoreAllMocks();
  });

  xdescribe('saveFeedback(): ', () => {
    it('should save feedback', () => {
      const feedback = {
        callId: '42',
      };

      return operatorFeedback.saveFeedback(feedback).then(() => {
        expect(callRepository.saveFeedback).toHaveBeenCalledWith(feedback);
        expect(localStorage.getItem).toHaveBeenCalledWith(FEEDBACKS_TO_SAVE);
        expect(localStorage.setItem).not.toHaveBeenCalled();
      });
    });

    it('should remove feedback from queue after saving', () => {
      const feedback = {
        callId: '42',
      };

      localStorage.setItem(FEEDBACKS_TO_SAVE, JSON.stringify([feedback]));

      return operatorFeedback.saveFeedback(feedback).then(() => {
        expect(callRepository.saveFeedback).toHaveBeenCalledWith(feedback);
        expect(localStorage.getItem).toHaveBeenCalledWith(FEEDBACKS_TO_SAVE);
        expect(localStorage.setItem).toHaveBeenCalledWith(FEEDBACKS_TO_SAVE, JSON.stringify([]));
      });
    });

    it('should re-reject error if it was not caused by lost network', () => {
      const feedback = {
        callId: '42',
      };
      const error = new Error('test');
      error.request = {
        status: 200,
      };

      callRepository.saveFeedback.mockImplementationOnce(() => Promise.reject(error));
      localStorage.setItem(FEEDBACKS_TO_SAVE, JSON.stringify([feedback]));

      return operatorFeedback.saveFeedback(feedback).catch(err => {
        expect(localStorage.getItem).not.toHaveBeenCalled();
        expect(err).toBe(error);
      });
    });

    it('should resolve and do not add feedback if error but feedbacks was already there', () => {
      const feedback = {
        callId: '42',
      };
      const error = new Error('test');
      error.request = {
        status: 0,
      };

      callRepository.saveFeedback.mockImplementationOnce(() => Promise.reject(error));
      localStorage.setItem(FEEDBACKS_TO_SAVE, JSON.stringify([feedback]));
      localStorage.setItem.mockClear();

      return operatorFeedback.saveFeedback(feedback).then(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith(FEEDBACKS_TO_SAVE);
        expect(localStorage.setItem).not.toHaveBeenCalled();
      });
    });

    it('should resolve and add feedback if error and feedback was not already there', () => {
      const feedback = {
        callId: '42',
      };
      const error = new Error('test');
      error.request = {
        status: 0,
      };

      localStorage.setItem(FEEDBACKS_TO_SAVE, JSON.stringify([]));
      callRepository.saveFeedback.mockImplementationOnce(() => Promise.reject(error));

      return operatorFeedback.saveFeedback(feedback).then(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith(FEEDBACKS_TO_SAVE);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          FEEDBACKS_TO_SAVE,
          JSON.stringify([feedback])
        );
      });
    });
  });

  xdescribe('checkAndSaveWaitingFeedbacks(): ', () => {
    it('should do anything if no waiting feedbacks', () => {
      const expectedFeedbacks = JSON.stringify([]);

      localStorage.setItem(FEEDBACKS_TO_SAVE, JSON.stringify([]));

      return operatorFeedback.checkAndSaveWaitingFeedbacks().then(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith(FEEDBACKS_TO_SAVE);
        expect(callRepository.saveFeedback).not.toHaveBeenCalled();
        expect(localStorage.getItem(FEEDBACKS_TO_SAVE)).toEqual(expectedFeedbacks);
      });
    });

    it('should save feedbacks and remove saved from storage', () => {
      const feedbacks = [{ callId: '42' }, { callId: '24' }];
      const expectedFeedbacks = JSON.stringify([]);

      localStorage.setItem(FEEDBACKS_TO_SAVE, JSON.stringify(feedbacks));

      return operatorFeedback.checkAndSaveWaitingFeedbacks().then(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith(FEEDBACKS_TO_SAVE);
        expect(callRepository.saveFeedback).toHaveBeenCalledTimes(2);
        expect(localStorage.getItem(FEEDBACKS_TO_SAVE)).toEqual(expectedFeedbacks);
      });
    });

    it('should save feedbacks and do not remove failed by lost connection', () => {
      const feedbacks = [{ callId: '42' }, { callId: '24' }];
      const expectedFeedbacks = JSON.stringify(feedbacks.slice(1, 2));
      const error = new Error();
      error.request = {
        status: 0,
      };

      localStorage.setItem(FEEDBACKS_TO_SAVE, JSON.stringify(feedbacks));
      callRepository.saveFeedback
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject(error));

      return operatorFeedback.checkAndSaveWaitingFeedbacks().then(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith(FEEDBACKS_TO_SAVE);
        expect(callRepository.saveFeedback).toHaveBeenCalledTimes(2);
        expect(localStorage.getItem(FEEDBACKS_TO_SAVE)).toEqual(expectedFeedbacks);
      });
    });
  });
});
