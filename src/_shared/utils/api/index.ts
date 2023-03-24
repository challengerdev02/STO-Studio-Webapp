import axios from 'axios';
import { Storage } from '@/shared/utils';
import { WEB3_SIGNATURE_STORAGE_KEY } from '@/shared/constants';

// Default config options
const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

// Update instance
export const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(
  (config: any) => {
    if (!config.isExternal) {
      const storage = new Storage(WEB3_SIGNATURE_STORAGE_KEY);
      config.headers['x-signed-data'] = JSON.stringify(storage.get());
      console.log(
        JSON.stringify(storage.get()),
        'JSON.stringify(storage.get())'
      );
      config.headers['x-api-key'] = 'Metacomic';
    }

    return config;
  },
  (error) => {
    // Do something with request error
    //return Promise.reject(error);
    throw error;
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Do something with response error
    //  return Promise.reject(error.response);
    throw error;
  }
);

export const createApiRequest = (config: any) => instance(config);

export default createApiRequest;

export { instance as AxiosInstance };
