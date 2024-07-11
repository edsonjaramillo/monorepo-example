import Cookies from 'js-cookie';

export const AnalyticsEvents = {
  callToAction(): EventVerification {
    const eventName = 'Call to action button pressed';
    const maxClicks = 2;

    const canSendEvent = checkMaxiumumAttempts(eventName, maxClicks);
    if (!canSendEvent) {
      return { sendEvent: false, eventName };
    }

    return { sendEvent: true, eventName };
  },
};

function checkMaxiumumAttempts(cookie: string, maxClicks: number): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const cookieName = Buffer.from(cookie).toString('base64');
  const cookieValue = Cookies.get(cookieName);
  if (!cookieValue) {
    Cookies.set(cookieName, '1', { expires: 1 });
    return true;
  }

  const isValid = /^[1-9]\d*$/.test(cookieValue);
  if (!isValid) {
    return false;
  }

  const clickCount = Number(cookieValue);
  if (clickCount < maxClicks) {
    const newClickCount = clickCount + 1;
    Cookies.set(cookieName, newClickCount.toString(), { expires: 1 });
    return true;
  }

  return false;
}

type EventVerification = {
  eventName: string;
  sendEvent: boolean;
};
