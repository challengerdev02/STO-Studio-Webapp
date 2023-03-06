import axios from 'axios';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { isFunction } from 'lodash';
import { useState } from 'react';

type CustomRequestOptions = {
  onSuccess?: (response: any, file?: any) => void;
  onProgress?: (options: { percent: string }, file?: any) => void;
  onError?: (reason: any) => void;
  onAbort?: () => void;
  params?: Record<string, any>;
  data?: any;
};

export const useUploadRequest = () => {
  const [uploading, setUploading] = useState(false);

  const makeUploadRequest = (
    options: CustomRequestOptions & RcCustomRequestOptions,
    customOptions?: CustomRequestOptions
  ) => {
    setUploading(true);

    const {
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
      method,
    } = options;

    const formData: FormData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    if (filename != null) {
      formData.append(filename, file);
    }

    axios({
      method,
      data: formData,
      url: action,
      withCredentials,
      headers,
      params: customOptions?.params ?? {},
      onUploadProgress: ({ total, loaded }) => {
        const progressPercent = Math.round((loaded / total) * 100).toFixed(2);
        if (onProgress) {
          onProgress(
            {
              percent: progressPercent,
            },
            file
          );
        }
        if (isFunction(customOptions?.onProgress)) {
          customOptions?.onProgress({ percent: progressPercent });
        }
      },
    })
      .then(({ data: response }) => {
        setUploading(false);
        if (onSuccess) {
          onSuccess(response, file);
        }
        if (isFunction(customOptions?.onSuccess)) {
          customOptions?.onSuccess(response);
        }
      })
      .catch((reason) => {
        setUploading(false);
        if (isFunction(customOptions?.onError)) {
          customOptions?.onError(reason);
        }
        if (onError) {
          onError(reason);
        }
      });

    return {
      abort() {
        if (isFunction(customOptions?.onAbort)) {
          customOptions?.onAbort();
        }
        console.info('ℹ upload progress is aborted.');
      },
    };
  };

  return { uploading, makeUploadRequest };
};
