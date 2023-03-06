import { AttributeModalForm, CreateScene, MainLoader } from '@/components';
import { useArtist, useBook, useScene, useUIState } from '@/hooks';
import { Form, notification, Progress } from 'antd';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { onBeforeImageUpload } from '@/shared/utils';
import { UploadFile } from 'antd/es/upload/interface';
import { get, has, isString, map, pick } from 'lodash';
import { ATTRIBUTE_TYPES } from '@/shared/constants';

interface CreateSceneContainerProps {
  assetDomain?: 'revise' | 'create';
}

export const CreateSceneContainer = (props: CreateSceneContainerProps) => {
  const { assetDomain = 'create' } = props;
  const router = useRouter();
  const { assetID, sceneID, referrer } = router.query;
  const KEY = `@@${assetDomain}-book`;
  const UI_KEY = `@@${assetDomain}-book-ui`;
  const UI_REVISE_KEY = `@@revise-scene-access-ui`;

  const [form] = Form.useForm();
  const [attributeForm] = Form.useForm();
  const [uploadResponse, setUploadResponse] = useState<any>();
  const [attributes, setAttributes] = useState<any>({});

  const [attributeModalVisibility, setAttributeModalVisibility] =
    useState(false);

  const { book, handleGetBook } = useBook({ key: KEY });
  const { allArtists, handleGetAll: handleGetAllArtists } = useArtist({
    key: KEY,
  });
  const optionsObject = {
    uiKey: UI_KEY,
  };

  const { handleCreateScene, scene, handleGetScene, handleUpdateScene } =
    useScene({
      key: KEY,
      options: optionsObject,
    });
  const { uiLoaders } = useUIState();
  const loading = uiLoaders[UI_KEY];
  const loadingBook = uiLoaders[KEY];
  const loadingScene = uiLoaders[UI_REVISE_KEY];
  const initialValues = {
    artists: [{ name: '', address: undefined, url: undefined }],
    explicitContent: false,
    blockchain: Number(process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID),
  };

  const onGetScene = (sceneID: string) => {
    if (sceneID && assetDomain === 'revise') {
      handleGetScene(sceneID, {
        params: {
          population: JSON.stringify([
            'attributes',
            'artists',
            // 'series',
            'user',
          ]),
        },
        uiKey: UI_REVISE_KEY,
      });
    }
  };

  const onInitialValues = () => {
    if (
      has(scene, '_id') &&
      get(scene, '_id') === sceneID &&
      assetDomain === 'revise'
    ) {
      // const series = map(get(scene, 'series', []), (s) => get(s, 'title'));
      const values = [
        { name: 'coverImage', value: get(scene, 'coverImage') },
        { name: 'description', value: get(scene, 'description') },
        { name: 'title', value: get(scene, 'title') },
        { name: 'infoLink', value: get(scene, 'infoLink') },
        { name: 'ageRating', value: get(scene, 'ageRating') },
        { name: 'explicitContent', value: get(scene, 'explicitContent') },
        { name: 'genres', value: get(scene, 'genres') },
        {
          name: 'series',
          value: get(scene, 'series'),
        },
        {
          name: 'artists',
          value: map(get(scene, 'artists', initialValues.artists), (artist) =>
            Object.assign({}, pick(artist, ['url', 'name']), {
              address: get(artist, 'walletAddress'),
            })
          ),
        },
      ];
      form.setFields(values);

      const transformedAttributes = map(get(scene, 'attributes', []), (attr) =>
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

      const upload = {
        uid: get(scene, '_id'),
        response: {
          data: {
            file: { url: get(scene, 'coverImage') },
          },
          meta: {},
        },
      };
      setUploadResponse(upload);
    }
  };

  const onUploadChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      notification.info({
        message: 'Upload in-progress',
        description: info.file.name,
        placement: 'bottomLeft',
        key: 'upload',
      });
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

    return info;
  };

  const onSubmit = (payload: Record<string, any>) => {
    const finalPayload: any = { ...payload, ...attributes };

    const coverImage = get(uploadResponse, 'response.data.file.url');
    if (!coverImage) {
      notification.error({
        message: 'Cover Image is required',
        placement: 'bottomLeft',
      });
      return;
    }
    finalPayload['coverImage'] = coverImage;

    if (!finalPayload['explicitContent']) {
      finalPayload['explicitContent'] = false;
    }
    if (!finalPayload['attributes']) {
      finalPayload['attributes'] = [];
    } else {
      finalPayload['attributes'] = map(
        finalPayload['attributes'],
        (attribute) => ({
          ...attribute,
          value: isString(attribute.value)
            ? attribute.value
            : attribute?.value?.toDate() ?? '',
        })
      );
    }
    finalPayload['book'] = book?._id;

    if (assetDomain === 'revise') {
      handleUpdateScene(finalPayload, sceneID as string, {
        onFinish: () => {
          form.resetFields();
          attributeForm.resetFields();
          if (referrer && typeof referrer === 'string') {
            router.push(referrer);
            return;
          }
          router.push(`/assets/${book?._id}`);
        },
      });

      return;
    }
    handleCreateScene(finalPayload, {
      onFinish: () => {
        form.resetFields();
        attributeForm.resetFields();
        router.push(`/assets/${book?._id}`);
      },
    });
  };

  const onAttributeModalVisibilityChange = (visibility = false) => {
    setAttributeModalVisibility(visibility);
  };

  const onFinish = (payload: Record<string, any>) => {
    setAttributes(payload);
    onAttributeModalVisibilityChange(false);
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (sceneID) {
      onGetScene(sceneID as string);
    }
  }, [sceneID]);

  useEffect(() => {
    if (assetID) {
      handleGetBook(assetID?.toString() ?? '');
    }
  }, [assetID]);

  useEffect(() => {
    handleGetAllArtists({
      params: {
        perPage: '1000',
      },
    });
  }, []);

  useEffect(() => {
    onInitialValues();
  }, [scene?._id]);

  const draggerProps = {
    name: 'file',
    listType: 'picture' as any,
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    onChange: onUploadChange,
    beforeUpload: (file: any) => onBeforeImageUpload(file, 2000),
    maxCount: 1,
    showUploadList: true,
    disabled: loading,
    itemRender: (_: ReactElement, file: UploadFile) => {
      // const { remove } = actions;

      return (
        file.status !== 'done' && (
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

  if (
    !book?.title ||
    loadingBook ||
    (loadingScene && assetDomain === 'revise')
  ) {
    return (
      <div style={{ height: '50vh' }} className={'meta-flex-center meta-flex'}>
        <MainLoader height={40} width={40} />
      </div>
    );
  }

  const pageTitle =
    assetDomain === 'revise'
      ? `${book?.title}: ${get(scene, 'title', 'Scene')}`
      : `New Scene/Bonus Art: ${book?.title}`;

  return (
    <>
      <CreateScene
        onSubmit={onSubmit}
        book={book}
        onAttributeModalVisibilityChange={onAttributeModalVisibilityChange}
        attributes={attributes.attributes ?? []}
        allArtists={allArtists}
        loading={loading}
        initialValues={initialValues}
        draggerProps={draggerProps}
        uploadedFile={uploadResponse}
        form={form}
        title={pageTitle}
        assetDomain={assetDomain}
        goBack={goBack}
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
