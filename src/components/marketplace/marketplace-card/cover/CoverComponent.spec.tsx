import { cleanup, queryByRole, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CoverComponent, CoverComponentType } from './index';

import { useTimer } from '../../../../hooks/useTimer';

jest.mock('../../../../hooks/useTimer', () => {
  return {
    useTimer: jest.fn().mockImplementation(() => {
      return {
        days: '09',
        minutes: '10',
        seconds: '50',
        hours: '03',
        isActive: true,
      };
    }),
  };
});

describe('Container', function () {
  afterEach(cleanup);

  const CoverComponentReact = (props: CoverComponentType) => (
    <>{CoverComponent(props.menuItems ?? [], props.startDate, props.endDate)}</>
  );

  let props: CoverComponentType = {
    countDown: '01:52:09 left 🔥',
    startDate: new Date(2022, 0, 1, 12, 30, 20, 0),
    endDate: new Date(2021, 11, 16, 12, 30, 7, 999),
    menuItems: ['Option A', 'Option B', 'Option c'],
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<CoverComponentReact {...props} {...extraProps} />);
    return {
      ...utils,
    };
  };

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should match with snapshot', () => {
    // @ts-ignore
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should have Content "This is a test for Content"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByRole(document.body, 'count-down-text')).toBeInTheDocument();
  });

  it('should match with snapshot with InActive', () => {
    // @ts-ignore
    useTimer.mockImplementation(() => {
      return {
        days: '09',
        minutes: '10',
        seconds: '50',
        hours: '03',
        isActive: false,
      };
    });

    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot with Days === 00', () => {
    // @ts-ignore
    useTimer.mockImplementation(() => {
      return {
        days: '00',
        minutes: '10',
        seconds: '50',
        hours: '03',
        isActive: true,
      };
    });

    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
