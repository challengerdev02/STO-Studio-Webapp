import { AttributeModalForm, CreateItem, MainLoader } from '@/components';
import { Form, notification, Progress } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useAccount, useBook, useSeries, useUIState } from '@/hooks';
import { useRouter } from 'next/router';
import { AGE_RATINGS, ATTRIBUTE_TYPES } from '@/shared/constants';
import {
  onBeforeImageUpload,
  onCheckImageDimension,
  verifyFileSize,
} from '@/shared/utils';
import {
  get,
  has,
  isEmpty,
  isEqual,
  isString,
  map,
  pick,
  toLower,
} from 'lodash';
import { UploadFile } from 'antd/es/upload/interface';
import { DraggerProps } from 'antd/es/upload';
import { BaseWeb3Context } from '../../../blockchain/base';
import { CreateSeriesContainer } from '../series';

interface CreateBookContainerProps {
  assetDomain?: 'revise' | 'create';
  account?: string;
}

export type DraggerPropsParameters = {
  key: string;
  fileSize?: number;
  maxDimensions?: [number, number];
  minDimensions?: [number, number];
  accept?: string;
  type: 'image' | 'video' | string;
  multiple?: boolean;
};

export const CreateBookContainer = (props: CreateBookContainerProps) => {
  const { assetDomain = 'create' } = props;
  const KEY = `@@${assetDomain}-book`;
  const UI_KEY = `@@${assetDomain}-book-ui`;
  const INVITE_UI_KEY = `@@${assetDomain}-book-ui/invitation-code`;
  const UI_REVISE_KEY = `@@revise-book-access-ui`;
  const router = useRouter();

  const assetID = get(router, 'query.assetID');

  const { signedAddress, isConnected } = useContext(BaseWeb3Context);

  const actionOptions = {
    uiKey: UI_KEY,
  };
  const { user, handleBecomeACreator, handleGetAccount } = useAccount({
    key: '@@user-account',
    autoFetch: true,
  });

  const { handleCreateBook, handleGetBook, book, handleUpdateBook } = useBook({
    key: KEY,
    options: actionOptions,
  });
  const { allSeries, handleGetAll: handleGetAllSeries } = useSeries({
    key: KEY,
    autoFetch: true,
    options: {
      params: {
        walletAddress: toLower(signedAddress),
      },
    },
  });

  const [attributes, setAttributes] = useState<any>({});
  const [uploadResponse, setUploadResponse] = useState<Record<string, any>>();
  const [lastUploadResponse, setLastUploadResponse] =
    useState<Record<string, any>>();
  const [pageList, setPageList] = useState<any[]>([]);
  const [uploadThumbnailResponse, setUploadThumbnailResponse] =
    useState<Record<string, any>>();

  const [form] = Form.useForm();
  const [attributeForm] = Form.useForm();

  const [attributeModalVisibility, setAttributeModalVisibility] =
    useState(false);

  const [seriesModalVisibility, setSeriesModalVisibility] = useState(false);

  const { uiLoaders } = useUIState();
  const loading = uiLoaders[UI_KEY];
  const loadingUser = uiLoaders['@@user-account'];
  const loadingBook = uiLoaders[UI_REVISE_KEY];
  const checkingInvitationCode = uiLoaders[INVITE_UI_KEY];

  const onGetBook = () => {
    if (assetID && assetDomain === 'revise') {
      handleGetBook(assetID?.toString() ?? '', {
        params: {
          population: JSON.stringify([
            {
              path: 'scenes',
              populate: [{ path: 'artists' }, { path: 'attributes' }],
            },
            'attributes',
            'artists',
            'user',
            'characters',
          ]),
        },
        uiKey: UI_REVISE_KEY,
      });
    }
  };
  const getPageList = (book: any) => {
    if (!book?.pages?.length)
      book.pages = book.coverImage ? [book.coverImage] : [];
    return get(book, 'pages').map((url: string, index: number) => ({
      uid: `page${index}`,
      name: `page${index}.jpg`,
      status: 'done',
      url,
    }));
  };
  const onInitialValues = () => {
    if (
      has(book, '_id') &&
      get(book, '_id') === assetID &&
      assetDomain === 'revise'
    ) {
      const assetCollection = get(book, 'assetCollection');
      const artists = get(book, 'editors') ?? [];

      const values = [
        { name: 'coverImage', value: get(book, 'coverImage') },
        { name: 'assetCollection', value: assetCollection },
        { name: 'description', value: get(book, 'description') },
        { name: 'title', value: get(book, 'title') },
        { name: 'infoLink', value: get(book, 'infoLink') },
        { name: 'issueNumber', value: get(book, 'issueNumber') },
        { name: 'isbn', value: get(book, 'isbn') },
        { name: 'numberOfPages', value: get(book, 'numberOfPages') },
        { name: 'ageRating', value: get(book, 'ageRating') },
        { name: 'explicitContent', value: get(book, 'explicitContent') },
        { name: 'genres', value: get(book, 'genres') },
        { name: 'pages', value: get(book, 'pages') },
        {
          name: 'artists',
          value: isEmpty(artists)
            ? []
            : artists.map((artist) => ({
                name: artist,
              })),
        },
        // {
        //   name: 'artists',
        //   value: map(get(book, 'artists', []), (artist) =>
        //     Object.assign({}, pick(artist, ['url', 'name']), {
        //       address: get(artist, 'walletAddress'),
        //     })
        //   ),
        // },
      ];

      form.setFields(values);
      const pageList = getPageList(book);
      setPageList(pageList);

      const transformedAttributes = map(get(book, 'attributes', []), (attr) =>
        pick(attr, ['title', 'attributeType', 'value'])
      );

      const attributes = [
        {
          name: 'attributes',
          value: transformedAttributes,
        },
      ];

      attributeForm.setFields(attributes);

      setAttributes({ attributes: transformedAttributes });

      const upload: any = {};

      pageList.forEach((p: any) => {
        upload[p.uid] = {
          file: { url: p.url },
        };
      });
      setUploadResponse(upload);
      setLastUploadResponse({
        uid: get(book, '_id'),
        response: {
          data: {
            file: { url: get(book, 'coverImage') },
          },
          meta: {},
        },
      });
      const uploadThumbnail = {
        uid: get(book, '_id'),
        response: {
          data: {
            file: { url: get(book, 'thumbnail') },
          },
          meta: {},
        },
      };
      setUploadThumbnailResponse(uploadThumbnail);
    }
  };

  const onUploadChange = (info: any, key: string) => {
    if (key == 'upload') {
      setPageList(info.fileList);
    }

    if (info.file.status == 'uploading') {
      notification.info({
        message: 'Upload in-progress',
        description: info.file.name,
        placement: 'bottomLeft',
        key,
      });
      if (info.file.response && info.file.response.data) {
        if (key == 'upload') {
          setLastUploadResponse(info.file);
          setUploadResponse((v) => ({
            ...v,
            [info.file.uid]: info.file.response.data,
          }));
        }
        if (key == 'uploadThumbnail') setUploadThumbnailResponse(info.file);
      }
    }
    if (info.file.status != 'uploading') {
      if (info.file.response && info.file.response?.data) {
        if (key == 'upload') {
          setLastUploadResponse(info.file);
          setUploadResponse((v) => ({
            ...v,
            [info.file.uid]: info.file.response.data,
          }));
        }
        if (key == 'uploadThumbnail') setUploadThumbnailResponse(info.file);
      }
    }
    if (info.file.status === 'done') {
      notification.success({
        message: 'Upload success',
        description: info.file.name,
        placement: 'bottomLeft',
        key,
      });
    } else if (info.file.status === 'error') {
      notification.error({
        message: `${info.file.name} file upload failed.`,
        description: info.file.response?.message,
        placement: 'bottomLeft',
        key,
      });
    }
  };

  const onSubmit = (payload: Record<string, any>) => {
    const finalPayload: any = { ...payload, ...attributes };
    finalPayload.pages = pageList.map((p: any) =>
      get(uploadResponse?.[p.uid], 'file.url')
    );

    const series: any = allSeries.find(
      (s: any) => s._id == finalPayload.series
    );
    if (series) {
      finalPayload.genres = series.genres;
    }

    const thumbnail = get(uploadThumbnailResponse, 'response.data.file.url');
    if (!thumbnail) {
      notification.error({
        message: 'Thumbnail is required',
        placement: 'bottomLeft',
      });
      return;
    }

    finalPayload.thumbnail = thumbnail;

    if (!isEmpty(finalPayload?.artists)) {
      finalPayload['editors'] = map(finalPayload?.artists, (artist) => {
        return get(artist, 'name');
      });

      delete finalPayload.artists;
    }

    if (!finalPayload['explicitContent']) {
      finalPayload['explicitContent'] = false;
    }
    if (isEmpty(finalPayload['attributes'])) {
      finalPayload['attributes'] = [];
    } else {
      // //console.log(finalPayload);
      finalPayload['attributes'] = map(
        finalPayload['attributes'] ?? [],
        (attribute) => ({
          ...attribute,
          value: isString(attribute.value)
            ? attribute.value
            : attribute?.value?.toDate() ?? '',
        })
      );
    }

    if (!isEmpty(finalPayload['blockchain'])) {
      finalPayload['blockchain'] = String(finalPayload['blockchain'] ?? '');
    }

    if (assetDomain === 'revise') {
      if (!assetID) return;

      if (finalPayload?.pages && isEqual(book?.pages, finalPayload?.pages)) {
        delete finalPayload?.pages;
      }
      if (!finalPayload.coverImage) {
        notification.error({
          message: 'You must add a strip/scene(s)',
          placement: 'bottomLeft',
        });
        return;
      }
      handleUpdateBook(finalPayload, String(assetID), {
        onFinish: (book: Record<string, any>) => {
          form.resetFields();
          attributeForm.resetFields();
          router.push(`/assets/${book._id}`).then();
        },
      });
      return;
    }
    finalPayload.coverImage = finalPayload.pages[0]; // should only be called when creating

    handleCreateBook(finalPayload, {
      onFinish: (book: Record<string, any>) => {
        form.resetFields();
        attributeForm.resetFields();
        router.push(`/assets/${book._id}`);
      },
    });
  };

  const onFinish = (payload: Record<string, any>) => {
    setAttributes(payload);
    setAttributeModalVisibility(false);
  };

  const seriesOptions = (allSeries ?? []).map((s) => {
    return { value: s._id, label: s.title };
  });

  const onGenreChange = (options: string[]) => {
    form.setFieldsValue({ genres: options.splice(0, 2) });
  };

  const onAttributeModalVisibilityChange = (visibility = false) => {
    setAttributeModalVisibility(visibility);
  };

  const onSeriesModalVisibilityChange = (visibility = false) => {
    setSeriesModalVisibility(visibility);
  };

  const onSubmitInvitationCode = (values: Record<string, any>) => {
    handleBecomeACreator(values, {
      uiKey: INVITE_UI_KEY,
      noErrorMessage: false,
      onFinish: () => {
        handleGetAccount();
      },
    });
  };

  const goBack = () => {
    router.back();
  };

  const onSeriesCreateComplete = () => {
    if (user?.walletAddress)
      handleGetAllSeries({ params: { walletAddress: user?.walletAddress } });
    onSeriesModalVisibilityChange();
  };

  useEffect(() => {
    onGetBook();
  }, [assetID]);
  useEffect(() => {
    if (user?.walletAddress)
      handleGetAllSeries({ params: { walletAddress: user?.walletAddress } });
  }, [user?.walletAddress, isConnected, signedAddress]);
  useEffect(() => {
    onInitialValues();
  }, [book?._id, allSeries, signedAddress]);

  const draggerProps = (options: DraggerPropsParameters): DraggerProps => ({
    name: 'file',
    listType: 'picture' as any,
    multiple: false,
    fileList: options.multiple ? (book ? getPageList(book) : []) : undefined,
    action: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    onChange: (info) => onUploadChange(info, options.key),
    beforeUpload: async (file: any) => {
      // const isInDimensions = true;

      // <<<<<<< HEAD
      //       const isImageAndMatchSize = onBeforeImageUpload(file, fileSize);
      //       // if (!maxDimensions || isEmpty(maxDimensions)) {
      //       //   return isImageAndMatchSize;
      //       // }
      //       console.log('BEFOR UPLOAD RUNNING');
      //       const isInDimensions = await onCheckImageDimension(
      //         file,
      //         maxDimensions ?? undefined,
      //         minDimensions
      //       );
      //       console.log('ISDIMENT', isInDimensions);
      // =======
      if (options.type === 'image') {
        const isImageAndMatchSize = onBeforeImageUpload(
          file,
          options.fileSize ?? 100
        );
        // if (!options.maxDimensions || isEmpty(options.maxDimensions)) {
        //   return isImageAndMatchSize;
        // }
        const isInDimensions = await onCheckImageDimension(
          file,
          options.maxDimensions,
          options.minDimensions
        );
        return isImageAndMatchSize && isInDimensions;
      }

      return verifyFileSize(file, options.fileSize);
      // return isImageAndMatchSize && isInDimensions;
    },
    maxCount: 1,
    accept:
      options.accept ??
      [
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
      // const { remove } = actions;

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
  });

  const initialValues: Record<string, any> = {
    explicitContent: false,
    artists: [{ name: '' }],
    blockchain: Number(process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID),
  };

  if (
    (loadingBook && assetDomain === 'revise') ||
    (!has(book, '_id') && assetDomain === 'revise')
  ) {
    return (
      <div style={{ height: '50vh' }} className={'meta-flex-center meta-flex'}>
        <MainLoader height={40} width={40} />
      </div>
    );
  }

  const pageTitle =
    assetDomain === 'revise'
      ? `${get(book, 'title', 'Book')}: Revised`
      : 'Create New Ordinal';

  return (
    <>
      <CreateSeriesContainer
        visibility={seriesModalVisibility}
        onVisibilityChange={onSeriesModalVisibilityChange}
        onCreateComplete={onSeriesCreateComplete}
      />
      <CreateItem
        title={pageTitle}
        assetDomain={assetDomain}
        form={form}
        // GENRE_OPTIONSOptions={GENRE_OPTIONS}
        ageOptions={AGE_RATINGS}
        onSeriesModalVisibilityChange={onSeriesModalVisibilityChange}
        seriesOptions={seriesOptions}
        onGENRE_OPTIONSChange={onGenreChange}
        onSubmit={onSubmit}
        onAttributeModalVisibilityChange={onAttributeModalVisibilityChange}
        attributes={attributes.attributes ?? []}
        loading={loading}
        uploadedFile={lastUploadResponse}
        uploadedThumbnail={uploadThumbnailResponse}
        draggerProps={draggerProps}
        initialValues={initialValues}
        goBack={goBack}
        canCreate={true}
        onSubmitInvitationCode={onSubmitInvitationCode}
        checkingInvitationCode={checkingInvitationCode}
        loadingUser={loadingUser}
      />

      <AttributeModalForm
        visible={attributeModalVisibility}
        handleCancel={() => onAttributeModalVisibilityChange(false)}
        onFinish={onFinish}
        subtitle="Properties show up underneath your item, are clickable, and can be filtered in your collection’s sidebar."
        types={ATTRIBUTE_TYPES}
        title="Add Attributes"
        form={attributeForm}
      />
    </>
  );
};
