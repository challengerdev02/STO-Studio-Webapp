import { Dialog, MainLoader, ViewAsset } from '@/components';
import { useAccount, useAssets, useSale, useUIState } from '@/hooks';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DialogActions } from '@/components/isomorphic/dialog';
import { BaseWeb3Context } from '../../../blockchain/base';
import { BookNamespace } from '@/shared/namespaces/book';
// import { AssetsNamespace } from '@/shared/namespaces/assets';
import { get, isEmpty, toLower } from 'lodash';
import { OutterContainer } from '@/components/assets/view/index.styled';
import { notification, Typography } from 'antd';
import Link from 'next/link';
import { enumerateUser } from '@/components/sale/view/columns';
import { UserNamespace } from '@/shared/namespaces/user';
import { BecomeCreator } from '@/components/account/become-creator';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Head from 'next/head';

export const ViewBookContainer = () => {
  const router = useRouter();
  const { assetID } = router.query;
  const key = '@@view-book-container';
  const likeAssetKey = `${key}/like-asset`;
  const publishAssetKey = `${key}/publish-asset`;
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);

  const { asset, handleGetAsset, handleUpdateAsset } = useAssets({ key });

  // const { book, handleGetBook } = useBook({ key });
  const { uiLoaders } = useUIState();
  const dialogSceneRef = useRef<ReturnType<typeof Dialog.show>>();
  const dialogCharacterRef = useRef<ReturnType<typeof Dialog.show>>();
  const loading = uiLoaders[key];
  const likingAsset = uiLoaders[likeAssetKey];
  const publishingAsset = uiLoaders[publishAssetKey];
  const [previewVisibility, setPreviewVisibility] = useState<boolean>(false);
  const { user, handleGetAccount } = useAccount({ key, autoFetch: true });

  const { accounts } = useContext(BaseWeb3Context);

  const walletAddress = accounts?.length
    ? String(accounts && accounts[0]).toLowerCase()
    : undefined;
  // const [asset, setAsset] = useState<AssetsNamespace.Assets>();

  const { likeAsset, unlikeAsset } = useSale({ key });
  const [becomeCreator, setBecomeCreator] = useState(false);

  const onGetBook = (otherParams = {}) => {
    if (assetID) {
      handleGetAsset(assetID?.toString() ?? '', {
        params: {
          population: JSON.stringify([
            'series',
            {
              path: 'asset',
              populate: [
                {
                  path: 'scenes',
                  populate: [{ path: 'artists' }, { path: 'attributes' }],
                },
                {
                  path: 'characters',
                  populate: [{ path: 'artists' }, { path: 'attributes' }],
                },
                'attributes',
                //'artists',

                'user',
              ],
            },
            'user',
          ]),
          ...otherParams,
        },
        onError: () => {
          //TODO: Check this, might lead to unwanted behaviour, if the error is not 404. e.g network error
          router.replace(`/404?referrer=/account`);
        },
      });
    }
  };

  useEffect(() => {
    onGetBook();
  }, [assetID]);

  // useEffect(() => {
  //   if (asset?._id) {
  //     setAsset({ ...asset });
  //   }
  // }, [asset?._id]);

  const onCreateScene = (event: any) => {
    router.push(`/assets/${asset?._id}/scenes/create`);
    event.preventDefault();
  };

  const onReviseBook = () => {
    router.push(`/assets/${asset?._id}/revise`);
  };

  const onSellBook = () => {
    router.push(`/assets/${asset?._id}/sale`);
  };

  const onPreviewBook = (visibility: boolean) => {
    setPreviewVisibility(visibility);
  };

  const onSceneActions = (sceneID: string) => {
    const content = `Do you want to revise this scene or sell it?`;

    const actions: DialogActions = [
      [
        {
          key: 'revise',
          text: 'Revise',
          type: 'text',
          style: {
            fontWeight: 600,
            fontSize: '1em',
          },
          onClick: () => {
            dialogSceneRef.current?.destroy();
            router.push(`/assets/${asset?._id}/scenes/${sceneID}/revise`);
          },
        },
        {
          key: 'sell',
          text: 'Sell (Coming Soon)',
          type: 'link',
          style: {
            fontWeight: 600,
          },
          onClick: () => {
            // dialogSceneRef.current?.destroy();
            // router.push(`/assets/${sceneID}/sale`);
          },
        },
      ],
      {
        key: 'cancel',
        text: 'Cancel',
        type: 'text',
        onClick: () => {
          dialogSceneRef.current?.destroy();
        },
      },
    ];
    dialogSceneRef.current = Dialog.show({ content, actions });
  };

  const onTogglePublishAsset = () => {
    // if (!asset.published && user?.isCreator) {
    //   setBecomeCreator(true);
    //   return;
    // }
    handleUpdateAsset({ published: !asset?.published }, String(asset?._id), {
      onFinish: () => onGetBook({ uiKey: `${key}/re-fetch` }),
      uiKey: publishAssetKey,
    });
  };

  const onLikeAsset = () => {
    if (isEmpty(walletAddress)) {
      notification.error({
        message: 'You must be signed in to like an asset',
        placement: 'bottomLeft',
      });
      return;
    }
    const liked: boolean = get(asset, 'liked', false);
    setLoadingCaptcha(true);
    executeRecaptcha?.('subscription')
      .then((captcha) => {
        if (liked) {
          unlikeAsset(
            { assetId: get(asset, 'asset._id') },
            {
              captcha,
              uiKey: likeAssetKey,
              successMessage: 'Asset unliked',
              onFinish: () => onGetBook({ uiKey: `${key}/re-fetch` }),
            }
          );
          return;
        }

        likeAsset(
          { assetId: get(asset, 'asset._id') },
          {
            captcha,
            uiKey: likeAssetKey,
            successMessage: 'Asset liked',
            onFinish: () => onGetBook({ uiKey: `${key}/re-fetch` }),
          }
        );
      })
      .catch(() => {
        setLoadingCaptcha(false);
      })
      .then(() => {
        setLoadingCaptcha(false);
      });
  };

  const onCharacterActions = (characterID: string) => {
    const content = `Do you want to revise this character or sell it?`;

    const actions: DialogActions = [
      [
        {
          key: 'sell',
          text: 'Sell',
          type: 'link',
          style: {
            fontWeight: 600,
          },
          onClick: () => {
            dialogCharacterRef.current?.destroy();
            router.push(`/assets/${characterID}/sale`);
          },
        },
        {
          key: 'revise',
          text: 'Revise',
          type: 'text',
          style: {
            fontWeight: 600,
            fontSize: '1em',
          },
          onClick: () => {
            dialogCharacterRef.current?.destroy();
            router.push(
              `/assets/${asset?._id}/characters/${characterID}/revise`
            );
          },
        },
      ],
      {
        key: 'cancel',
        text: 'Cancel',
        type: 'text',
        onClick: () => {
          dialogCharacterRef.current?.destroy();
        },
      },
    ];
    dialogCharacterRef.current = Dialog.show({ content, actions });
  };

  const onCreateCharacter = (event: any) => {
    router.push(`/assets/${asset?._id}/characters/create`);
    event.preventDefault();
  };

  if (!asset?.asset?.title)
    return (
      <div style={{ height: '50vh' }} className={'meta-flex-center meta-flex'}>
        <MainLoader height={40} width={40} />
      </div>
    );

  if (
    toLower(walletAddress) !== toLower(asset.walletAddress) &&
    !asset.published
  ) {
    const user = enumerateUser(asset.user as any as UserNamespace.User);
    return (
      <OutterContainer>
        {/*<Container>*/}
        <div
          style={{ height: '50vh', width: '100%', gap: 60 }}
          className={'meta-flex-center meta-flex meta-flex-col'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 291.545 291.545"
            height={150}
            fill={'currentcolor'}
            // style="enable-background:new 0 0 291.545 291.545;"
            // xml:space="preserve"
          >
            <g>
              <path d="M238.685,111.889c-30.756-0.311-55.777-25.587-55.777-56.345c0-19.675,0-33.383,0-52.99h-73.927   c-19.944,0-36.17,16.226-36.17,36.17v55.269c33.093,4.988,60.943,33.32,60.943,71.863c9.422,6.357,15.63,17.13,15.63,29.327v53.671   v30v0h105.99c19.944,0,36.171-16.225,36.171-36.17V112.426C274.035,112.248,256.34,112.069,238.685,111.889z" />
              <path d="M237.825,89.144l52.185,0.529L205.782,2.739v54.034C205.782,74.442,220.156,88.963,237.825,89.144z" />
              <path d="M114.031,185.045L114.031,185.045h-5.492h0v-20.188c0-25.776-21.025-46.454-46.455-46.454   c-25.615,0-46.454,20.839-46.454,46.454v20.188h0h-5.492h0C4.67,185.045,0,189.496,0,195.183v83.67   c0,5.552,4.515,10.138,10.138,10.138h103.894c5.521,0,10.138-4.497,10.138-10.138v-83.67   C124.169,189.454,119.423,185.045,114.031,185.045z M62.085,143.552c11.748,0,21.306,9.558,21.306,21.306v19.245   c-15.293,0-27.335,0-42.612,0v-19.245C40.778,153.133,50.314,143.552,62.085,143.552z M71.934,237.994v16.629   c0,5.439-4.409,9.849-9.849,9.849c-5.44,0-9.849-4.41-9.849-9.849v-16.628c-3.698-2.917-6.08-7.427-6.08-12.502   c0-8.797,7.131-15.928,15.928-15.928c8.797,0,15.928,7.131,15.928,15.928C78.013,230.567,75.631,235.077,71.934,237.994z" />
            </g>
          </svg>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            Episode has not been published by{' '}
            <Link href={user.link}>{user.name}</Link> yet
          </Typography.Title>
        </div>
        {/*</Container>*/}
      </OutterContainer>
    );
  }
  return (
    <>
      <Head>
        <title>
          {asset.assetCollection.title} - {asset.asset.title}
        </title>
        <meta name="description" content={asset.asset.description} />
      </Head>
      <BecomeCreator
        user={user}
        onVisibilityChange={(v) => setBecomeCreator(v)}
        visibility={becomeCreator}
        onSubmit={(d) => d}
        checkingInvitationCode={false}
        reloadUser={() => handleGetAccount({ key })}
      />
      <ViewAsset
        {...(asset?.asset as any as BookNamespace.Book)}
        likes={asset.likes}
        liked={asset.liked}
        loading={loading}
        series={asset.assetCollection}
        published={asset?.published}
        onCreateScene={onCreateScene}
        onReviseBook={onReviseBook}
        onPreviewBook={onPreviewBook}
        onSellBook={onSellBook}
        onSceneActions={onSceneActions}
        onCharacterActions={onCharacterActions}
        onCreateCharacter={onCreateCharacter}
        previewVisibility={previewVisibility}
        currentAccount={String(walletAddress)}
        togglePublishAsset={onTogglePublishAsset}
        publishingAsset={publishingAsset}
        onLikeAsset={onLikeAsset}
        likingAsset={likingAsset || loadingCaptcha}
      />
    </>
  );
};
