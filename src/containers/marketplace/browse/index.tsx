import { BrowseNFT } from '@/components/marketplace/marketplace-view/browse';
import { useSale, useUIState } from '@/hooks';
import { getSaleTypeActionTitle, toEther } from '../../../blockchain/evm/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { generateAvatar } from '@/shared/utils';
import { CATEGORIES_OPTIONS } from '@/shared/constants';
import { isEmpty } from 'lodash';

export const BrowseAuctionSection = () => {
  const key = '@@browse-auction-marketplace-container';
  const router = useRouter();

  const { assets: bookSaleSchedules, getAllSaleAssets } = useSale({ key });
  const { uiLoaders, pagination } = useUIState();
  const loading = uiLoaders[key];
  const paginationData = pagination[key];
  const [assetType, setAssetType] = useState(null);
  const [saleType, setSaleType] = useState(null);
  const perPage = 4;

  useEffect(() => {
    getAllSaleAssets({
      params: {
        population: JSON.stringify(['user']),
        saleType,
        assetType,
        perPage,
        startDateTimestamp: { $lte: Math.floor(Date.now() / 1000) },
        endDateTimestamp: { $gte: Math.floor(Date.now() / 1000) },
      },
    });
  }, [assetType, saleType]);
  // //console.log('SCHEDULES', bookSaleSchedules)

  const browseAuction = (bookSaleSchedules ?? []).map((book) => ({
    coverInfo: {
      countDown: '01:52:09 left 🔥',
      startDate: new Date(book.startDate ?? Date.now()),
      endDate: new Date(book.endDate ?? Date.now()),
      coverImg: book.asset.thumbnail ?? book.asset.coverImage ?? '',
      menuItems: [],
    },
    cardData: {
      title: book.title ?? '',
      actionTitle: getSaleTypeActionTitle(book.saleType ?? ''),
      placeBid: () => {
        router.push(`/assets/${book?._id}/${book?.saleId}`);
      },
      iconURL: book.user?.avatar ?? generateAvatar(book?.user?.walletAddress),
      itemPrice: toEther(
        (book.latestOffer && book.latestOffer && book.latestOffer != '0'
          ? book.latestOffer
          : null) ?? book.price
      ),
      genres: book.asset.genres,
      blockchain: book.blockChain,
      count: book.asset.likes ?? '0',
      inWishlist: true,
    },
  }));

  const showLoadMore = paginationData?.next ? true : false;

  const onBlockChangeChange = (value: Record<any, any>) => {
    //console.log('onBlockChangeChange', value);
    getAllSaleAssets({
      params: {
        population: JSON.stringify(['user']),
        saleType,
        assetType,
        perPage,
        page: paginationData?.next ?? 1,
        ...(isEmpty(value) ? {} : value),
        // all: !isEmpty(value),
      },
      virtualized: isEmpty(value),
    });
  };

  return (
    <>
      <section className="tail">
        <div className="container">
          <BrowseNFT
            browseAuctionNfts={browseAuction}
            onFinish={undefined}
            onBlockChangeChange={(option) => setAssetType(option)}
            blockSelectItems={[
              { label: 'Book', value: 'Book' },
              { label: 'Bonus Art', value: 'Scene' },
              // { label: 'Character', value: 'Character' },
            ]}
            onGENRE_OPTIONSChangeChange={(value) =>
              onBlockChangeChange(
                !isEmpty(value) ? { GENRE_OPTIONS: value } : {}
              )
            }
            genreselectItems={CATEGORIES_OPTIONS}
            onSalesTypeChange={(option) => setSaleType(option)}
            salesSelectItems={[
              { label: 'Buy Now', value: 'BuyNow' },
              { label: 'Auction', value: 'Auction' },
              // { label: 'Launch', value: 'Launch' },
            ]}
            onPriceRangeChange={onBlockChangeChange}
            priceSelectItems={[]}
            recentlyAddedCB={onBlockChangeChange}
            loadMore={onBlockChangeChange}
            showLoad={showLoadMore}
            loadingState={loading}
          />
        </div>
      </section>
    </>
  );
};
