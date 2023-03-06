import {
  serverRequest,
  UPLOAD_MEDIA,
  uploadMedia as defaultuploadMediaAction,
} from '../../../actions';
import { uploadMedia as createuploadMediaMiddleware } from './index';
import { APP_URL, POST } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Create uploadMedia: Create uploadMedia Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let createuploadMedia = defaultuploadMediaAction;

  beforeEach(() => {
    createuploadMedia = jest.fn(defaultuploadMediaAction).mockReturnValue({
      type: UPLOAD_MEDIA.START,
      meta: payload,
    });
    mockedRedux.uploadMedia = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      uploadMedia: {
        uploadMedia: mockedRedux.uploadMedia,
      },
    });
    mockedRedux.createuploadMediaAction = createuploadMediaMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the createuploadMedia action since it is not in the targeted list of actions', () => {
    mockedRedux.createuploadMediaAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.createuploadMediaAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(createuploadMedia).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the createuploadMedia actions, then apiRequest action with correct parameters', () => {
    mockedRedux.createuploadMediaAction(createuploadMedia(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: POST,
        url: `${APP_URL.upload.create}`,
        ...payload,
        onSuccess: '@@media/upload_media_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: UPLOAD_MEDIA.START,
      meta: { ...payload },
    });
  });
});
