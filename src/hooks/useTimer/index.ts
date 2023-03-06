import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

export const useTimer = (
  startDate: Date | string,
  endDate: Date | string,
  onFinish?: () => any
) => {
  const count = differenceInSeconds(new Date(endDate), new Date(startDate));
  const [isActive, setIsActive] = useState(true);
  const [ended, setEnded] = useState(false);
  const [counter, setCounter] = useState({
    count: count || 0,
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
  });

  useEffect(() => {
    if (new Date(endDate) < new Date()) {
      setEnded(true);
    } else {
      setCounter((c: any) => {
        c.count = differenceInSeconds(new Date(endDate), new Date(startDate));
        return c;
      });
    }
  }, [endDate]);

  useEffect(() => {
    let intervalId: any;

    if (isActive) {
      intervalId = setInterval(() => {
        if (counter?.count >= 1) {
          setCounter((counter) => ({ ...counter, count: counter.count - 1 }));
        } else {
          setIsActive(false);
          if (!ended && onFinish) {
            onFinish();
            setEnded(true);
          }
        }

        const secondCounter = counter?.count % 60;
        const minuteCounter = Math.floor((counter?.count % 3600) / 60);
        const hourCounter = Math.floor((counter?.count % (3600 * 24)) / 3600);
        const daysCounter = Math.floor(counter?.count / (3600 * 24));

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        const computedHour =
          String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;
        const computedDay =
          String(daysCounter).length === 1 ? `0${daysCounter}` : daysCounter;

        setCounter((counter: any) => ({
          ...counter,
          seconds: computedSecond,
          minutes: computedMinute,
          hours: computedHour,
          days: computedDay,
        }));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, endDate, counter, onFinish]);

  function pause() {
    setIsActive(false);
  }

  function resume() {
    setIsActive(true);
  }

  function reset() {
    setCounter({
      count,
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00',
    });
    setIsActive(true);
  }

  return {
    isActive,
    counter: counter.count,
    seconds: counter.seconds,
    minutes: counter.minutes,
    hours: counter.hours,
    days: counter.days,
    pause,
    resume,
    reset,
  };
};
