import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProfileScreen } from './index';
import LiveAuctionCardImage from '../../../../public/zachary-kadolph-unsplash.svg';
import MathewBall from '../../../../public/mathew-ball.svg';
import BrianMcGowan from '../../../../public/brian-mcgowan.svg';
import CoverImage from '../../../../public/profile-cover-photo.svg';

describe('ProfileScreen component', () => {
  afterEach(cleanup);
  let props = {
    onLoadMore: () => {},
    loadingState: true,
    showLoad: true,
    onFinish: () => {},
    uploadProps: {},
    uploadCoverProps: {},
    onEditProfile: () => {},
    handleChangeCoverPhoto: () => {},
    handleDeleteCoverPhoto: () => {},
    onResetForm: () => {},
    onSearch: () => {},
    $record: {
      id: '000001',
      name: 'Emmanuel Iroko',
      createdAt: '2022',
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
      coverImg: CoverImage,
      profileImage: null,
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

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<ProfileScreen {...props} {...extraProps} />);
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

  it('should test the ProfileScreen component paints on screen ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('profile-screen-wrapper')).toBeInTheDocument();
  });

  it('should test the ProfileScreen component has a cover photo ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('cover-photo')).toBeInTheDocument();
  });

  it("should test the ProfileScreen component's change cover image widget is visible and clickable ", () => {
    const { getByTestId } = setup();
    expect(getByTestId('change-cover-image')).toBeInTheDocument();
  });

  it("should test the ProfileScreen component's delete cover image widget is visible and clickable ", () => {
    const { getByTestId } = setup();
    expect(getByTestId('delete-cover-image')).toBeInTheDocument();
  });

  it("should test the ProfileScreen component's has a profile image ", () => {
    const { getByTestId } = setup();
    expect(getByTestId('user-avatar')).toBeInTheDocument();
  });

  it('should test the profile image upload button works', async () => {
    let file: any;
    const { getByTestId } = setup();
    file = new File(['(⌐□_□)'], 'bg-image.jpg', { type: 'image/jpg' });

    let uploader = getByTestId('photo-uploader');
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      })
    );
  });

  it("should test the ProfileScreen component displays the user's name", () => {
    const { getByTestId } = setup();
    const username = getByTestId('username');

    expect(username).toBeInTheDocument();
  });

  it("should test the copy wallet address' button paints on screen", () => {
    const { getByTestId } = setup();
    expect(getByTestId('wallet-address')).toBeInTheDocument();
  });

  it("should test the user's follower count has a value", () => {
    const { getByTestId } = setup();
    expect(getByTestId('followers')).toBeInTheDocument();
  });

  it("should test the user's following count has a value", () => {
    const { getByTestId } = setup();
    expect(getByTestId('following')).toBeInTheDocument();
  });

  it('should test the settings widget button paints on screen', () => {
    const { getByTestId } = setup();
    const button = getByTestId('settings-widget');
    expect(button).toBeInTheDocument();
  });

  it('should test the share profile button paints on screen', () => {
    const { getByTestId } = setup();
    const button = getByTestId('share-profile');
    //console.log(prettyDOM(button));
    expect(button).toBeInTheDocument();
  });

  it('should check that the tab component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('tab')).toBeInTheDocument();
  });

  it('should check that the On Sale Tab displays by default', () => {
    const { getAllByRole, getByTestId } = setup();
    const onSaleTab = getAllByRole('tab')[0];
    const ownedTab = getAllByRole('tab')[1];
    const createdTab = getAllByRole('tab')[2];
    const myCollectionsTab = getAllByRole('tab')[3];
    const likedTab = getAllByRole('tab')[4];
    const activityTab = getAllByRole('tab')[5];

    expect(onSaleTab).toHaveTextContent(/on sale/i);
    expect(onSaleTab).toHaveAttribute('aria-selected', 'true');
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');

    expect(getByTestId('auctions-gallery')).toBeInTheDocument();
  });

  it('should check that the Owned Tab Pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const onSaleTab = getAllByRole('tab')[0];
    const ownedTab = getAllByRole('tab')[1];
    const createdTab = getAllByRole('tab')[2];
    const myCollectionsTab = getAllByRole('tab')[3];
    const likedTab = getAllByRole('tab')[4];
    const activityTab = getAllByRole('tab')[5];

    expect(ownedTab).toHaveTextContent(/owned/i);
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(ownedTab);

    expect(onSaleTab).toHaveAttribute('aria-selected', 'false');
    expect(ownedTab).toHaveAttribute('aria-selected', 'true');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should check that the Created Tab Pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const onSaleTab = getAllByRole('tab')[0];
    const ownedTab = getAllByRole('tab')[1];
    const createdTab = getAllByRole('tab')[2];
    const myCollectionsTab = getAllByRole('tab')[3];
    const likedTab = getAllByRole('tab')[4];
    const activityTab = getAllByRole('tab')[5];

    expect(createdTab).toHaveTextContent(/created/i);
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(createdTab);

    expect(onSaleTab).toHaveAttribute('aria-selected', 'false');
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'true');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should check that the My Collections Tab Pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const onSaleTab = getAllByRole('tab')[0];
    const ownedTab = getAllByRole('tab')[1];
    const createdTab = getAllByRole('tab')[2];
    const myCollectionsTab = getAllByRole('tab')[3];
    const likedTab = getAllByRole('tab')[4];
    const activityTab = getAllByRole('tab')[5];

    expect(myCollectionsTab).toHaveTextContent(/my collections/i);
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(myCollectionsTab);

    expect(onSaleTab).toHaveAttribute('aria-selected', 'false');
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'true');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should check that the Liked Tab Pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const onSaleTab = getAllByRole('tab')[0];
    const ownedTab = getAllByRole('tab')[1];
    const createdTab = getAllByRole('tab')[2];
    const myCollectionsTab = getAllByRole('tab')[3];
    const likedTab = getAllByRole('tab')[4];
    const activityTab = getAllByRole('tab')[5];

    expect(likedTab).toHaveTextContent(/liked/i);
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(likedTab);

    expect(onSaleTab).toHaveAttribute('aria-selected', 'false');
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'true');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should check that the Activity Tab Pane is clickable, and its active when clicked', () => {
    const { getAllByRole } = setup();
    const onSaleTab = getAllByRole('tab')[0];
    const ownedTab = getAllByRole('tab')[1];
    const createdTab = getAllByRole('tab')[2];
    const myCollectionsTab = getAllByRole('tab')[3];
    const likedTab = getAllByRole('tab')[4];
    const activityTab = getAllByRole('tab')[5];

    expect(activityTab).toHaveTextContent(/activity/i);
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(activityTab);

    expect(onSaleTab).toHaveAttribute('aria-selected', 'false');
    expect(ownedTab).toHaveAttribute('aria-selected', 'false');
    expect(createdTab).toHaveAttribute('aria-selected', 'false');
    expect(myCollectionsTab).toHaveAttribute('aria-selected', 'false');
    expect(likedTab).toHaveAttribute('aria-selected', 'false');
    expect(activityTab).toHaveAttribute('aria-selected', 'true');
  });

  it('should check that the select category component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('select-category')).toBeInTheDocument();
  });

  it('should check that the select collections component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('select-collections')).toBeInTheDocument();
  });

  it('should check that the select sale-type component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('select-sale-type')).toBeInTheDocument();
  });

  it('should check that the select timed auction component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('select-timed-auction')).toBeInTheDocument();
  });

  it('should test the search form-item is painted on screen', () => {
    const { getByPlaceholderText, getByTestId } = setup();

    expect(getByTestId('search')).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(/search/i), {
      target: { value: 'john doe' },
    });
  });

  it('should test the reset button paints on screen', () => {
    const { getByRole } = setup();
    const resetButton = getByRole('button', { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
  });
});
