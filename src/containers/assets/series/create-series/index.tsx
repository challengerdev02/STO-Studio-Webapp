import { CreateSeries } from '@/components';
import { get, has } from 'lodash';
import { useSeries, useUIState } from '@/hooks';
import { Form, notification, Progress } from 'antd';
import { onBeforeImageUpload, onCheckImageDimension } from '@/shared/utils';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import { CATEGORIES_OPTIONS } from '@/shared/constants';
import { DraggerProps } from 'antd/es/upload';
import { BaseWeb3Context } from '../../../../blockchain/base';
import { SeriesNamespace } from '@/shared/namespaces/series';

interface CreateSeriesContainerProps {
  domain?: 'revise' | 'create';
  seriesID?: string;
  visibility: boolean;
  onVisibilityChange: (visibility: boolean) => void;
  onCreateComplete: () => void;
}

export const CreateSeriesContainer = (props: CreateSeriesContainerProps) => {
  const {
    domain = 'create',
    visibility,
    onVisibilityChange,
    onCreateComplete,
    seriesID,
  } = props;
  const KEY = `@@${domain}-series`;
  const UI_KEY = `${KEY}-ui`;
  const UI_REVISE_KEY = `${KEY}/revise-ui`;

  const { accounts } = useContext(BaseWeb3Context);
  const walletAddress = accounts?.[0];
  const [form] = Form.useForm();
  const [uploadResponse, setUploadResponse] = useState<Record<string, any>>();
  // const referrer = get(router, 'query.referrer');

  const actionOptions = {
    uiKey: UI_KEY,
  };

  const {
    handleCreate,
    handleUpdate,
    handleGet,
    series: seriesData,
  } = useSeries({
    key: KEY,
    options: actionOptions,
  });

  const [series, setSeries] = useState<SeriesNamespace.Series | undefined>(
    seriesData
  );

  useEffect(() => {
    if (seriesData && domain == 'revise') setSeries(seriesData);
  }, [seriesData?._id]);

  const { uiLoaders } = useUIState();
  const loading = uiLoaders[UI_KEY];

  const onUploadChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      // notification.info({
      //   message: 'Upload in-progress',
      //   description: info.file.name,
      //   placement: 'bottomLeft',
      //   key: 'upload',
      // });
      if (info.file.response && info.file.response.data) {
        setUploadResponse(info.file);
      }
    }
    if (info.file.status === 'done') {
      notification.success({
        message: 'Upload success',
        description: info.file.name,
        placement: 'bottomLeft',
        key: 'upload',
      });
    } else if (info.file.status === 'error') {
      notification.error({
        message: `${info.file.name} file upload failed.`,
        description: info.file.response?.message,
        placement: 'bottomLeft',
        key: 'upload',
      });
    }
  };

  const onGENRE_OPTIONSChange = (options: string[]) => {
    form.setFieldsValue({ genres: options.splice(0, 2) });
  };

  const onGetSeries = () => {
    if (seriesID && domain === 'revise') {
      handleGet(seriesID?.toString() ?? '', {
        uiKey: UI_REVISE_KEY,
      });
    }
  };

  const onInitialValues = () => {
    if (
      has(series, '_id') &&
      get(series, '_id') === seriesID &&
      domain === 'revise'
    ) {
      // const series = map(get(book, 'series', []), (s) => get(s, 'title'));
      const values = [
        { name: 'image', value: get(series, 'image') },
        { name: 'description', value: get(series, 'description') },
        { name: 'title', value: get(series, 'title') },
        { name: 'genres', value: get(series, 'genres') },
      ];
      form.setFields(values);

      const upload = {
        uid: get(series, '_id'),
        response: {
          data: {
            file: { url: get(series, 'image') },
          },
          meta: {},
        },
      };
      setUploadResponse(upload);
    }
  };

  const onSubmit = (values: Record<string, any>) => {
    const coverImage = get(uploadResponse, 'response.data.file.url');
    const payload = {
      ...values,
      image: coverImage,
      walletAddress: walletAddress,
    };
    if (!coverImage) {
      notification.error({
        message: 'Cover Image is required',
        placement: 'bottomLeft',
      });
      return;
    }

    if (domain === 'revise' && seriesID) {
      handleUpdate(payload, seriesID, {
        onFinish: () => {
          // form.resetFields();
          onCreateComplete();
          // setUploadResponse({});
          // if (referrer) {
          //   router.push(`${referrer}?REFERRED_TYPE=1&DATA_ID${data['_id']}`);
          //   return;
          // }
          // router.push(`/profile?tab=series`);
        },
      });
      return;
    }
    handleCreate(payload, {
      onFinish: () => {
        form.resetFields();
        onCreateComplete();
        setUploadResponse({});
        // if (referrer) {
        //   router.push(`${referrer}?REFERRED_TYPE=1`);
        //   return;
        // }
        // router.push(`/profile?tab=series`);
      },
    });
  };

  const draggerProps: DraggerProps = {
    name: 'file',
    listType: 'picture' as any,
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    onChange: onUploadChange,
    beforeUpload: async (file: any) => {
      const isInDimensions = await onCheckImageDimension(
        file,
        [2500, 2500],
        [500, 500]
      );
      // const isInDimensions = true;
      const isImageAndMatchSize = onBeforeImageUpload(file, 50000000);
      return isImageAndMatchSize && isInDimensions;
    },
    maxCount: 1,
    accept: [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
      'model/gltf-binary',
      'model/gltf+json',
    ].join(', '),
    showUploadList: true,
    itemRender: (_: ReactElement, file: UploadFile) => {
      return (
        file.status &&
        file.status !== 'done' &&
        file.status !== 'error' &&
        file.status !== 'removed' && (
          <div
            className="w-100 h-100"
            // style={{ position: "relative", bottom: -40 }}
          >
            <Progress
              percent={parseInt(file?.percent?.toFixed(2) ?? '0')}
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              strokeWidth={3}
            />
          </div>
        )
      );
    },
  };

  useEffect(() => {
    onGetSeries();
  }, [seriesID]);

  useEffect(() => {
    onInitialValues();
  }, [series?._id]);

  const pageTitle =
    domain === 'revise'
      ? `${get(series, 'title', 'Series')}: Revised`
      : 'Create New Collection';

  return (
    <CreateSeries
      loading={loading}
      title={pageTitle}
      form={form}
      onSubmit={onSubmit}
      draggerProps={draggerProps}
      uploadedFile={uploadResponse}
      onGENRE_OPTIONSChange={onGENRE_OPTIONSChange}
      categories={CATEGORIES_OPTIONS}
      visibility={visibility}
      onVisibilityChange={onVisibilityChange}
      domain={domain}
    />
  );
};
