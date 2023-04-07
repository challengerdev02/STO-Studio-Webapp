import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { makeServerRequest } from '@/actions';
import { APP_URL } from '@/shared/constants';

type ApiMethod = 'post' | 'get' | 'patch' | 'put' | 'delete';

interface UseApiRequest {
  apiResponse?: any;
  makeApiRequestAsync: (data: {
    url: String;
    method: ApiMethod;
    payload?: Record<string, any>;
    options?: ActionOption;
  }) => void;
  makeApiRequest: (data: {
    url: String;
    method: ApiMethod;
    payload?: Record<string, any>;
    options?: ActionOption;
  }) => void;
  getBtcFees: () => Promise<any>;
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

  const makeApiRequest = (data: {
    url: String;
    method?: ApiMethod;
    payload?: Record<string, any> | undefined;
    options?: ActionOption;
  }) => {
    dispatch(
      makeServerRequest(data.url, data.method ?? 'get', data.payload, {
        ...defaultOptions,
        ...data.options,
        key: key,
      })
    );
  };
  const makeApiRequestAsync = async (data: {
    url: String;
    method?: ApiMethod;
    payload?: Record<string, any> | undefined;
    options?: ActionOption;
  }) => {
    return new Promise((resolve, reject) => {
      dispatch(
        makeServerRequest(data.url, data.method ?? 'get', data.payload, {
          ...defaultOptions,
          ...data.options,
          key: key + data.url,
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

  const getBtcFees = async (): Promise<any> => {
    return new Promise((resolve, _) => {
      makeApiRequest({
        url: APP_URL.bitcoin.fee,
        options: { onFinish: (v) => resolve(v) },
      });
    });
  };
  return {
    makeApiRequest,
    makeApiRequestAsync,
    apiResponse,
    getBtcFees,
  };
};
