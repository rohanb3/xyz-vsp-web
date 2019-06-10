/* eslint-disable import/prefer-default-export */
import * as callRepository from '@/services/callRepository';
import { DOM_EVENTS } from '@/constants';

const { ONLINE } = DOM_EVENTS;

const FEEDBACKS_TO_SAVE = 'FEEDBACKS_TO_SAVE';

window.addEventListener(ONLINE, checkAndSaveWaitingFeedbacks);

export function saveFeedback(feedback) {
  return callRepository
    .saveFeedback(feedback)
    .then(res => {
      checkAndRemoveFromQueue(feedback);
      return res;
    })
    .catch(err => {
      if (!err.request.status) {
        checkAndAddToQueue(feedback);
        return Promise.resolve();
      }
      return Promise.reject(err);
    });
}

export function checkAndSaveWaitingFeedbacks() {
  const waitingFeedbacks = getWaitingFeedbacks();
  const waitingFeedbacksPromises = waitingFeedbacks.map(saveFeedback);
  return Promise.all(waitingFeedbacksPromises).catch(err => {
    /* eslint-disable-next-line no-console */
    console.error('Saving feedbacks failed: ', err);
  });
}

// private methods

function checkAndRemoveFromQueue(feedback) {
  const waitingFeedbacks = getWaitingFeedbacks();
  const feedbacks = waitingFeedbacks.filter(
    waitingFeedback => waitingFeedback.callId !== feedback.callId
  );
  if (feedbacks.length !== waitingFeedbacks.length) {
    updateFeedbacksQueue(feedbacks);
  }
}

function getWaitingFeedbacks() {
  const rawFeedbacks = localStorage.getItem(FEEDBACKS_TO_SAVE);
  let feedbacks = null;
  try {
    feedbacks = JSON.parse(rawFeedbacks) || [];
  } catch (err) {
    feedbacks = [];
  }
  return feedbacks;
}

function updateFeedbacksQueue(feedbacks) {
  localStorage.setItem(FEEDBACKS_TO_SAVE, JSON.stringify(feedbacks));
}

function checkAndAddToQueue(feedback) {
  const waitingFeedbacks = getWaitingFeedbacks();
  const isAlreadyExist = waitingFeedbacks.some(
    waitingFeedback => waitingFeedback.callId === feedback.callId
  );
  if (!isAlreadyExist) {
    waitingFeedbacks.push(feedback);
    updateFeedbacksQueue(waitingFeedbacks);
  }
}
