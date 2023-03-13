import { ImportView } from '@/components/import';
import { useUIState } from '@/hooks';
import account from '@/redux';
import _ from 'lodash';

import { useRouter } from 'next/router';

import { useContext, useEffect, useState } from 'react';
import { BaseWeb3Context } from 'src/blockchain/base';
import { useApiRequest } from 'src/hooks/useApiRequest';
import { useCollections } from 'src/hooks/useCollections';

export const ImportContainer = () => {
  const router = useRouter();
  const { makeApiRequestAsync } = useApiRequest({
    key: '@@load-collection-uri',
  });
  let { address, chainId = 1 } = router.query;
  const {
    accounts,
    isConnected,
    signedAddress,
    chainId: selectedChainId,
  } = useContext(BaseWeb3Context);
  const userKey = '@@user-account';
  const collectedItemKey = `${userKey}/collected`;
  const { collections, handleFetchCollections } = useCollections({
    key: collectedItemKey,
  });

  const [walletAddress, setWalletAddress] = useState<string>();
  const [nfts, setNfts] = useState<
    {
      address: string;
      title: string;
      tokenId: number;
      description: string;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    if (address) setWalletAddress(String(address).toLowerCase());
    else {
      if (accounts && accounts[0]) setWalletAddress(accounts[0].toLowerCase());
    }
  }, [accounts, address]);
  const { uiLoaders, pagination } = useUIState();
  const loadingForCollectedItems = uiLoaders[collectedItemKey];

  const loading = {
    loadingForCollectedItems,
  };

  useEffect(() => {
    if (chainId && walletAddress) {
      handleFetchCollections({
        params: {
          address: walletAddress,
          chainId,
          perPage: 20,
        },
      });
    }
  }, [chainId, walletAddress]);

  useEffect(() => {
    setNfts(
      collections
        .filter((c) => !_.isEmpty(c.metadata))
        .map((c) => {
          const metadata = JSON.parse(c.metadata);
          if (String(metadata.image).startsWith('ipfs')) {
            metadata.image = metadata.image.replace(
              'ipfs://',
              'https://ipfs.io/ipfs/'
            );
          }
          return {
            address: c.token_address,
            title: c.name,
            image: metadata.image,
            tokenId: Number(c.token_id),
            description: metadata.description,
            verified: c.verified,
          };
        })
    );
  }, [collections]);

  return (
    <ImportView
      nfts={nfts}
      signedAddress={accounts?.[0]}
      chainId={Number(chainId ?? selectedChainId)}
      loadingNFts={loadingForCollectedItems}
      // selectedChainId={selectedChainId}
    />
  );
};
