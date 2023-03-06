import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import { CreateCharacterContainer } from './index';
// import CreateBook from './../../../components/create-book-wrapper';
jest.mock('react-redux');

// jest.mock('@/components/attribute-modal-form',  () => ({
//     ...jest.requireActual('./../../../components/attribute-modal-form'), // use actual for all non-hook parts
//   }));
// Ask Mr Cmion

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'), // use actual for all non-hook parts
  useParams: () => ({
    teamId: 'someTeamId',
    eventId: 'someEventId',
    broadcastId: 'someShowId',
  }),
  useRouter: () => ({
    query: {},
  }),
  useLocation: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'), // use actual for all non-hook parts
  useArtist: () => ({
    allArtists: [],
    handleGetAll: jest.fn(),
  }),
  useBook: () => ({
    book: {},
    handleGetBook: jest.fn(),
  }),
  useCharacter: () => ({
    handleCreateCharacter: jest.fn(),
  }),
  useUIState: () => ({
    uiLoaders: [],
  }),
}));

describe('Create Asset Container', function () {
  afterEach(cleanup);
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
    const { container } = render(<CreateCharacterContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should try to submit', async () => {
    // @ts-ignore
    const { container } = render(<CreateCharacterContainer />);

    await waitFor(() => {
      const btn = queryByText(document.body, 'Create Item');
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(
        queryAllByAttribute(
          'class',
          document.body,
          'ant-form-item-explain-error'
        ).length
      ).toBe(2);
      //   expect(queryByText(document.body, "phone number")).toBeInTheDocument();
    });
  });
});
