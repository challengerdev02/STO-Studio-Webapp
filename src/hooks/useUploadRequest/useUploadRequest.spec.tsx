import { act, renderHook } from '@testing-library/react-hooks';
import { useUploadRequest } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

const store = configureMockStore([])({});

describe('Test hooks: useUploadRequest', () => {
  //create a wrapper
  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );
  //render hooks from library
  const { result, rerender } = renderHook(() => useUploadRequest(), {
    wrapper: Wrapper,
  });

  let mockHandleMakeUploadRequest: any;
  let mockLoading: boolean;

  beforeEach(() => {
    rerender();
    mockHandleMakeUploadRequest = result.current.makeUploadRequest;
    mockLoading = result.current.uploading;
  });

  it('return default values', () => {
    const mockHandleMakeUploadRequestJest = jest
      .fn(mockHandleMakeUploadRequest)
      .mockReturnValue({ onAbort: () => {} });

    expect(mockHandleMakeUploadRequestJest).not.toBeCalled();
    expect(mockLoading).toBe(false);
  });

  it('should trigger mockHandleMakeUploadRequest and set loading to true', () => {
    act(() => {
      mockHandleMakeUploadRequest({
        action: 'test-action',
        data: [],
        file: 'test-file',
        filename: 'test-filename',
        headers: 'test-header',
        onError: () => {},
        onProgress: () => {},
        onSuccess: () => {},
        withCredentials: false,
        method: 'POST',
      });
    });

    expect(result.current.uploading).toBe(false);
  });
});
