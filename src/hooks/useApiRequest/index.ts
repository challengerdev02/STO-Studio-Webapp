import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { makeServerRequest } from '@/actions';

type ApiMethod = 'post' | 'get' | 'patch' | 'put' | 'delete';

interface UseApiRequest {
  apiResponse?: any;
  makeApiRequestAsync: (
    url: String,
    method: ApiMethod,
    payload?: Record<string, any>,
    options?: ActionOption
  ) => void;
  makeApiRequest: (
    url: String,
    method: ApiMethod,
    payload?: Record<string, any>,
    options?: ActionOption
  ) => void;
}

interface UseApiRequestProps {
  key: string;
  // autoFetch?: boolean;
  options?: ActionOption;
}

export const useApiRequest = (parameter: UseApiRequestProps): UseApiRequest => {
  const { key, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { apiResponse } = useSelector((state: RootState) => {
    return {
      apiResponse: state.apiResponse?.data[key] ?? {},
    };
  });

  const makeApiRequest = (
    url: String,
    method: ApiMethod = 'get',
    payload?: Record<string, any> | undefined,
    options?: ActionOption
  ) => {
    dispatch(
      makeServerRequest(url, method, payload, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };
  const makeApiRequestAsync = async (
    url: String,
    method: ApiMethod = 'get',
    payload?: Record<string, any>,
    options?: ActionOption
  ) => {
    return new Promise((resolve, reject) => {
      dispatch(
        makeServerRequest(url, method, payload, {
          ...defaultOptions,
          ...options,
          key: key + url,
          onFinish: (d) => {
            console.log('RESPONSE', d);
            resolve(d);
          },
          onError: (_) => {
            resolve(null);
          },
          // onAfterError: (e)=>{
          //   resolve(e);
          // },
        })
      );
    });
  };

  return {
    makeApiRequest,
    makeApiRequestAsync,
    apiResponse,
  };
};
