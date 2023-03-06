import {
  cleanup,
  fireEvent,
  queryByText,
  render,
  act,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Profile } from './index';
import { Form } from 'antd';

describe('Edit Profile component', function () {
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
    };

    return <Profile {...props} />;
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

  it('should test the Edit Profile component paints on screen ', () => {
    const {} = setup({ visible: true });
    expect(queryByText(document.body, 'Profile Settings')).toBeInTheDocument();
    expect(queryByText(document.body, 'Preview')).toBeInTheDocument();
  });

  it('should test the Username form-item is in the domument', () => {
    const { getByLabelText } = setup();

    const username = getByLabelText(/username/i);
    expect(username).toBeInTheDocument();
  });

  it('should test the Username form-item change event fires', () => {
    const { getByLabelText } = setup();

    act(() => {
      const username = getByLabelText(/username/i);
      fireEvent.change(username, { target: { value: 'Jaydoe' } });
    });
  });

  it('should test the User Email Address form-item is in the domument', () => {
    const { getByLabelText } = setup();

    const email = getByLabelText(/email address/i);
    expect(email).toBeInTheDocument();
  });

  it('should test the User Email Address form-item change event fires', () => {
    const { getByLabelText } = setup();

    act(() => {
      const email = getByLabelText(/email address/i);
      fireEvent.change(email, { target: { value: 'jaydoe@gmail.com' } });
    });
  });

  it('should test the User Bio form-item is in the domument', () => {
    const { getByLabelText } = setup();

    const bio = getByLabelText(/bio/i);
    expect(bio).toBeInTheDocument();
  });

  it('should test the User Bio form-item change event fires', () => {
    const { getByLabelText } = setup();

    act(() => {
      const bio = getByLabelText(/bio/i);
      fireEvent.change(bio, { target: { value: 'Lorem ipsum lorem' } });
    });
  });

  it('should test the User Twitter handle form-item is in the domument', () => {
    const { getByTestId } = setup();

    const twitter = getByTestId('twitter-form-item');
    expect(twitter).toBeInTheDocument();
  });

  it('should test the User Twitter handle form-item change event fires', () => {
    const { getByTestId } = setup();

    act(() => {
      const twitter = getByTestId('twitter-form-item');
      fireEvent.change(twitter, { target: { value: '@jaydoe' } });
    });
  });

  it('should test the User Instagram handle form-item is in the domument', () => {
    const { getByTestId } = setup();

    const instagram = getByTestId('instagram-form-item');
    expect(instagram).toBeInTheDocument();
  });

  it('should test the User Instagram handle form-item change event fires', () => {
    const { getByTestId } = setup();

    act(() => {
      const instagram = getByTestId('instagram-form-item');
      fireEvent.change(instagram, { target: { value: '@jaydoe' } });
    });
  });

  it('should test the User web url form-item is in the domument', () => {
    const { getByLabelText } = setup();

    const web_url = getByLabelText(/your website/i);
    expect(web_url).toBeInTheDocument();
  });

  it('should test the User web url form-item change event fires', () => {
    const { getByLabelText } = setup();

    act(() => {
      const web_url = getByLabelText(/your website/i);
      fireEvent.change(web_url, {
        target: { value: 'https://www.jaydoe.com' },
      });
    });
  });

  it('should test the User wallet address form-item is in the domument', () => {
    const { getByTestId } = setup();

    const wallet_address = getByTestId('wallet-address');
    expect(wallet_address).toBeInTheDocument();
  });

  it('should test the copy button is in the domument and its clickable', () => {
    const { getByTestId } = setup();

    act(() => {
      const copy_btn = getByTestId('copy-btn');
      expect(copy_btn).toBeInTheDocument();
      fireEvent.submit(copy_btn);
    });
  });

  it('should test the ProfileScreen has a cover photo component ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('profile-banner')).toBeInTheDocument();
  });

  it('should test the ProfileScreen cover photo component is clickable ', async () => {
    let file: any;
    const { getByTestId } = setup();
    file = new File(['(⌐□_□)'], 'bg-image.jpg', { type: 'image/jpg' });

    let user_avatar = getByTestId('profile-banner');
    await waitFor(() =>
      fireEvent.change(user_avatar, {
        target: { files: [file] },
      })
    );
  });

  it('should test the ProfileScreen has a user avatar component ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('user-avatar')).toBeInTheDocument();
  });

  it('should test the ProfileScreen user avatar  is clickable ', async () => {
    let file: any;
    const { getByTestId } = setup();
    file = new File(['(⌐□_□)'], 'bg-image.jpg', { type: 'image/jpg' });

    let user_avatar = getByTestId('user-avatar');
    await waitFor(() =>
      fireEvent.change(user_avatar, {
        target: { files: [file] },
      })
    );
  });
});
