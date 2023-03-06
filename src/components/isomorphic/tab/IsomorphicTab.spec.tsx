import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IsomorphicTab } from './index';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

describe('Isomorphic Tab component', function () {
  afterEach(cleanup);
  let props = {
    onChange: jest.fn(),
    children: (
      <>
        {' '}
        <TabPane tab="Info" key="1" />
        <TabPane tab="Buy" key="2" />
        <TabPane tab="Sell" key="3" />
      </>
    ),
  };

  const setup = () => {
    const utils = render(<IsomorphicTab {...props} />);
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

  it('should check that the Isomorpic tab component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('isomorphic-tab')).toBeInTheDocument();
  });

  it('should check that the info tab displays by default', () => {
    const { getAllByRole } = setup();
    const infoTab = getAllByRole('tab')[0];
    const buyTab = getAllByRole('tab')[1];
    const sellTab = getAllByRole('tab')[2];

    expect(infoTab).toHaveTextContent(/info/i);
    expect(infoTab).toHaveAttribute('aria-selected', 'true');
    expect(buyTab).toHaveAttribute('aria-selected', 'false');
    expect(sellTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should check that the buy tab pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const infoTab = getAllByRole('tab')[0];
    const buyTab = getAllByRole('tab')[1];
    const sellTab = getAllByRole('tab')[2];

    expect(buyTab).toHaveTextContent(/buy/i);
    expect(buyTab).toHaveAttribute('aria-selected', 'false');
    expect(sellTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(buyTab);

    expect(buyTab).toHaveAttribute('aria-selected', 'true');
    expect(infoTab).toHaveAttribute('aria-selected', 'false');
    expect(sellTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should check that the sell tab pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const infoTab = getAllByRole('tab')[0];
    const buyTab = getAllByRole('tab')[1];
    const sellTab = getAllByRole('tab')[2];

    expect(sellTab).toHaveTextContent(/sell/i);
    expect(buyTab).toHaveAttribute('aria-selected', 'false');
    expect(sellTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(sellTab);

    expect(sellTab).toHaveAttribute('aria-selected', 'true');
    expect(buyTab).toHaveAttribute('aria-selected', 'false');
    expect(infoTab).toHaveAttribute('aria-selected', 'false');
  });
});
