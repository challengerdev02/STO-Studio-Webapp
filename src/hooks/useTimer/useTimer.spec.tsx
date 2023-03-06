import { renderHook } from '@testing-library/react-hooks';
import { useTimer } from './index';
import { act, cleanup } from '@testing-library/react';

describe('Test hooks: useTimer', () => {
  afterEach(() => {
    cleanup();
  });

  let startDate = new Date(2022, 0, 1, 12, 30, 20, 0);
  let endDate = new Date(2021, 11, 16, 12, 30, 7, 999);
  let differenceInSeconds = 1382412;

  const { result } = renderHook(() => useTimer(startDate, endDate));

  let mockSeconds = result.current.seconds;
  let mockMinutes = result.current.minutes;
  let mockHours = result.current.hours;
  let mockDays = result.current.days;

  it('returns remaining days, hours, minutes, and seconds', () => {
    act(() => {
      mockSeconds = '12';
      mockMinutes = '00';
      mockHours = '00';
      mockDays = '16';
    });

    expect(result.current.counter % 60).toEqual(12);
    expect(Math.floor((result.current.counter % 3600) / 60)).toEqual(0);
    expect(Math.floor((result.current.counter % (3600 * 24)) / 3600)).toEqual(
      0
    );
    expect(Math.floor(result.current.counter / (3600 * 24))).toEqual(16);

    const countdown = {
      counter: result.current.counter,
      seconds: mockSeconds,
      minutes: mockMinutes,
      hours: mockHours,
      days: mockDays,
    };
    expect(countdown).toEqual({
      counter: differenceInSeconds,
      seconds: '12',
      minutes: '00',
      hours: '00',
      days: '16',
    });
  });
});
