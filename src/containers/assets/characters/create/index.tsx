import { AttributeModalForm, CreateCharacter, MainLoader } from '@/components';
import { useArtist, useBook, useCharacter, useUIState } from '@/hooks';
import { Form, notification, Progress } from 'antd';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { onBeforeImageUpload } from '@/shared/utils';
import { UploadFile } from 'antd/es/upload/interface';
import { get, has, isString, map, pick } from 'lodash';
import { ATTRIBUTE_TYPES } from '@/shared/constants';

interface CreateCharacterContainerProps {
  assetDomain?: 'revise' | 'create';
}

export const CreateCharacterContainer = (
  props: CreateCharacterContainerProps
) => {
  const { assetDomain = 'create' } = props;
  const router = useRouter();
  const { assetID, characterID, referrer } = router.query;
  const KEY = `@@${assetDomain}-book`;
  const UI_KEY = `@@${assetDomain}-book-ui`;
  const UI_REVISE_KEY = `@@revise-character-access-ui`;

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

  const {
    handleCreateCharacter,
    character,
    handleGetCharacter,
    handleUpdateCharacter,
  } = useCharacter({
    key: KEY,
    options: optionsObject,
  });
  const { uiLoaders } = useUIState();
  const loading = uiLoaders[UI_KEY];
  const loadingBook = uiLoaders[KEY];
  const loadingCharacter = uiLoaders[UI_REVISE_KEY];
  const initialValues = {
    artists: [{ name: '', address: undefined, url: undefined }],
    explicitContent: false,
    blockchain: Number(process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID),
  };

  const onGetCharacter = (characterID: string) => {
    if (characterID && assetDomain === 'revise') {
      handleGetCharacter(characterID, {
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
      has(character, '_id') &&
      get(character, '_id') === characterID &&
      assetDomain === 'revise'
    ) {
      // const series = map(get(character, 'series', []), (s) => get(s, 'title'));
      const values = [
        { name: 'coverImage', value: get(character, 'coverImage') },
        { name: 'description', value: get(character, 'description') },
        { name: 'title', value: get(character, 'title') },
        { name: 'infoLink', value: get(character, 'infoLink') },
        { name: 'ageRating', value: get(character, 'ageRating') },
        { name: 'explicitContent', value: get(character, 'explicitContent') },
        { name: 'genres', value: get(character, 'genres') },
        {
          name: 'series',
          value: get(character, 'series'),
        },
        {
          name: 'artists',
          value: map(
            get(character, 'artists', initialValues.artists),
            (artist) =>
              Object.assign({}, pick(artist, ['url', 'name']), {
                address: get(artist, 'walletAddress'),
              })
          ),
        },
      ];
      form.setFields(values);

      const transformedAttributes = map(
        get(character, 'attributes', []),
        (attr) => pick(attr, ['title', 'attributeType', 'value'])
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
        uid: get(character, '_id'),
        response: {
          data: {
            file: { url: get(character, 'coverImage') },
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
        description: info.file.response.message,
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
      handleUpdateCharacter(finalPayload, characterID as string, {
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
    handleCreateCharacter(finalPayload, {
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
    if (characterID) {
      onGetCharacter(characterID as string);
    }
  }, [characterID]);

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
  }, [character?._id]);

  const draggerProps = {
    name: 'file',
    listType: 'picture' as any,
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    onChange: onUploadChange,
    beforeUpload: (file: any) => onBeforeImageUpload(file, 100),
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
    (loadingCharacter && assetDomain === 'revise')
  ) {
    return (
      <div style={{ height: '50vh' }} className={'meta-flex-center meta-flex'}>
        <MainLoader height={40} width={40} />
      </div>
    );
  }

  const pageTitle =
    assetDomain === 'revise'
      ? `${book?.title}: ${get(character, 'title', 'Character')}`
      : `Create Character: ${book?.title}`;

  return (
    <>
      <CreateCharacter
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
