import { renderHook } from '@testing-library/react-hooks';
import { useArtist } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

describe('Test hooks: useArtist', () => {
  const store = configureMockStore([])({
    artist: {
      artist: {
        ['test-key']: {
          name: 'mike',
          walletAddress: '0x',
          url: 'url string',
        },
      },
      allArtists: {
        ['test-key']: [
          {
            name: 'mike',
            walletAddress: '0x',
            url: 'url string',
          },
        ],
      },
      artistsById: {},
    },
  });
  //create a wrapper
  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );

  //render hooks from library
  const { result } = renderHook(
    () => useArtist({ key: 'test-key', autoFetch: true }),
    { wrapper: Wrapper }
  );

  const mockArtist = result.current.artist;
  const mockAllArtist = result.current.allArtists;
  const mockHandleCreate = result.current.handleCreate;
  const mockHandleDelete = result.current.handleDelete;
  const mockHandleFetch = result.current.handleGetAll;
  const mockHandleGet = result.current.handleGet;
  const mockHandleUpdate = result.current.handleUpdate;

  it('return default values', () => {
    expect(mockArtist).toBeDefined();
    expect(mockArtist?.name).toBe('mike');
    expect(mockArtist?.walletAddress).toBe('0x');
    expect(mockArtist?.url).toBe('url string');

    expect(mockAllArtist.length).toBe(1);
    expect(mockAllArtist).toEqual([
      {
        name: 'mike',
        walletAddress: '0x',
        url: 'url string',
      },
    ]);

    expect(mockHandleCreate).toBeDefined();
    expect(mockHandleCreate).toBeDefined();
    expect(mockHandleDelete).toBeDefined();
    expect(mockHandleFetch).toBeDefined();
    expect(mockHandleGet).toBeDefined();
    expect(mockHandleUpdate).toBeDefined();
  });
});
