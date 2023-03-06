import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccountEdit } from './index';
import LiveAuctionCardImage from '../../../public/zachary-kadolph-unsplash.svg';
import MathewBall from '../../../public/mathew-ball.svg';
import BrianMcGowan from '../../../public/brian-mcgowan.svg';
import CoverImage from '../../../public/profile-cover-photo.svg';
import { Form } from 'antd';

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
describe('AccountEdit component', function () {
  afterEach(cleanup);

  const Container = () => {
    const [form] = Form.useForm();

    let props = {
      loading: true,
      onFinish: () => {},
      uploadAvatarProps: {},
      uploadCoverProps: {},
      form: form,
      $record: {},
      onValidateUsername: jest.fn(),
      isValidUsername: false,
      validatingUsername: false,

      userData: {
        id: '000001',
        username: 'Emmanuel',
        firstName: 'Emmanuel firstName',
        lastName: 'Emmanuel lastName',
        email: 'emdoe@gmail.com',
        bio: 'lore ipsum lorem',
        walletAddress: '0x658d22456633334234iF0cC',
        connections: {
          followers: '230',
          following: '84',
        },
        auctions: [
          {
            itemCoverImage: LiveAuctionCardImage,
            itemName: 'Crypto Bull Society',
            bestOffer: '0.51',
            lastOffer: '0.42',
            likes: '1.7 k',
          },
          {
            itemCoverImage: BrianMcGowan,
            itemName: 'Crypto Bull Society',
            bestOffer: '0.51',
            lastOffer: '0.42',
            likes: '1.7 k',
          },
          {
            itemCoverImage: MathewBall,
            itemName: 'Crypto Bull Society',
            bestOffer: '0.51',
            lastOffer: '0.42',
            likes: '1.7 k',
          },
          {
            itemCoverImage: BrianMcGowan,
            itemName: 'Crypto Bull Society',
            bestOffer: '0.51',
            lastOffer: '0.42',
            likes: '1.7 k',
          },
          {
            itemCoverImage: MathewBall,
            itemName: 'Crypto Bull Society',
            bestOffer: '0.51',
            lastOffer: '0.42',
            likes: '1.7 k',
          },
          {
            itemCoverImage: LiveAuctionCardImage,
            itemName: 'Crypto Bull Society',
            bestOffer: '0.51',
            lastOffer: '0.42',
            likes: '1.7 k',
          },
          {
            itemCoverImage: MathewBall,
            itemName: 'Crypto Bull Society',
            bestOffer: '0.51',
            lastOffer: '0.42',
            likes: '1.7 k',
          },
        ],
        avatar: CoverImage,
        banner: null,
        uploadStates: {
          banner: false,
          avatar: false,
        },
        loadings: {
          banner: false,
          avatar: false,
        },
      },
    };

    return <AccountEdit {...props} />;
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<Container {...extraProps} />);
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

  it('should check that the AccountEdit tab component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('account-tab')).toBeInTheDocument();
  });

  it('should check that the Profile tab displays by default', () => {
    const { getAllByRole } = setup();
    const profileTab = getAllByRole('tab')[0];
    const notificationsTab = getAllByRole('tab')[1];
    const accountSupportTab = getAllByRole('tab')[2];

    expect(profileTab).toHaveTextContent(/profile/i);
    expect(profileTab).toHaveAttribute('aria-selected', 'true');
    expect(notificationsTab).toHaveAttribute('aria-selected', 'false');
    expect(accountSupportTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should check that the Notifications tab pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const profileTab = getAllByRole('tab')[0];
    const notificationsTab = getAllByRole('tab')[1];
    const accountSupportTab = getAllByRole('tab')[2];

    expect(notificationsTab).toHaveTextContent(/notifications/i);
    expect(notificationsTab).toHaveAttribute('aria-selected', 'false');
    expect(accountSupportTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(notificationsTab);

    expect(notificationsTab).toHaveAttribute('aria-selected', 'true');
    expect(profileTab).toHaveAttribute('aria-selected', 'false');
    expect(accountSupportTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should check that the Account Support tab pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const profileTab = getAllByRole('tab')[0];
    const notificationsTab = getAllByRole('tab')[1];
    const accountSupportTab = getAllByRole('tab')[2];

    expect(accountSupportTab).toHaveTextContent(/account support/i);
    expect(notificationsTab).toHaveAttribute('aria-selected', 'false');
    expect(accountSupportTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(accountSupportTab);

    expect(accountSupportTab).toHaveAttribute('aria-selected', 'true');
    expect(notificationsTab).toHaveAttribute('aria-selected', 'false');
    expect(profileTab).toHaveAttribute('aria-selected', 'false');
  });
});
