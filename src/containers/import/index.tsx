import { ImportView } from '@/components/import';
import { useUIState } from '@/hooks';
import _ from 'lodash';

import { useRouter } from 'next/router';

import { useContext, useEffect, useState } from 'react';
import { BaseWeb3Context } from 'src/blockchain/base';
import { useApiRequest } from 'src/hooks/useApiRequest';
import { useCollections } from 'src/hooks/useCollections';
import { Connection } from '@solana/web3.js';
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from '@nfteyez/sol-rayz';

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
    autoFetch: true,
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
    if (
      address?.slice(0, 2) === '0x' ||
      String(accounts?.[0]).slice(0, 2) === '0x'
    ) {
      if (address) setWalletAddress(String(address).toLowerCase());
      else {
        if (accounts && accounts[0])
          setWalletAddress(accounts[0].toLowerCase());
      }
    } else {
      if (address) setWalletAddress(String(address));
      else {
        if (accounts && accounts[0]) setWalletAddress(accounts[0]);
      }
    }
  }, [accounts, address]);
  const { uiLoaders, pagination } = useUIState();
  const loadingForCollectedItems = uiLoaders[collectedItemKey];

  const loading = {
    loadingForCollectedItems,
  };

  useEffect(() => {
    if (
      chainId == process.env.SOLANA_CHAIN_ID &&
      walletAddress?.slice(0, 2) !== '0x' &&
      walletAddress
    ) {
      listNfts(walletAddress);
    } else {
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
    console.log(chainId, 'chainId');
    if (
      chainId &&
      chainId != process.env.SOLANA_CHAIN_ID &&
      String(accounts?.[0]).slice(0, 2) === '0x'
    ) {
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
    }
  }, [collections.length]);

  const listNfts = async (wallet: string) => {
    console.log(wallet, 'walletAddress');
    const publicAddress = await resolveToWalletAddress({
      text: wallet,
    });

    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress,
      connection: new Connection(
        'https://try-rpc.mainnet.solana.blockdaemon.tech/'
      ),
    });
    var nftData = [];
    for (const item of nftArray) {
      try {
        const r = await fetch(item.data.uri).then((resp) => resp.json());
        console.log(r, 'rrrrr');
        if (r) {
          let nftItem = {
            address: item.mint,
            title: r.name,
            image: r.image,
            tokenId: item.key,
            description: r.description,
            verified: Boolean(item.data.creators[0].verified),
          };
          nftData.push(nftItem);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setNfts(nftData);
  };

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
