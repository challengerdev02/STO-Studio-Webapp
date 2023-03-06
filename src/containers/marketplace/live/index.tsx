import { CardCarousel } from '@/components/marketplace/marketplace-view/carousel';
import { useSale, useSeries, useUIState } from '@/hooks';
import { getSaleTypeActionTitle, toEther } from '../../../blockchain/evm/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { generateAvatar, timestamp } from '@/shared/utils';
// import { Col, Form, Row, Select } from 'antd';
// import { GENRE_OPTIONS } from '@/shared/constants';
// import { get } from 'lodash';
import { Image } from '@/components/layout/header/index.styled';

export const LiveAuctionAndLaunchingSoonSection = () => {
  const auctionKey = '@@live-auction-marketplace-container';
  const upcoming = '@@upcoming-marketplace-container';
  const featuredSeries = '@@upcoming-featured-series-container';

  const { queriedAssets: bookSaleSchedules, getAllSaleAssets } = useSale({
    key: auctionKey,
  });

  const { handleBrowseSeries } = useSeries({
    key: featuredSeries,
  });

  const { uiLoaders } = useUIState();
  const loading = uiLoaders[auctionKey] && uiLoaders[upcoming];
  // const loadingSeries = uiLoaders[featuredSeries];

  useEffect(() => {
    getAllSaleAssets({
      key: auctionKey,
      params: {
        population: JSON.stringify(['user']),
        saleType: 'Auction',
        startDateTimestamp: { $lte: timestamp() },
        endDateTimestamp: { $gte: timestamp() },
      },
    });

    getAllSaleAssets({
      key: upcoming,
      params: {
        population: JSON.stringify(['user']),
        startDateTimestamp: { $gt: timestamp() },
      },
    });

    handleBrowseSeries({
      params: {},
    });
  }, []);

  // const onGENRE_OPTIONSChangeChange = (GENRE_OPTIONS: any) => {
  //   handleBrowseSeries({
  //     params: { genres: GENRE_OPTIONS },
  //     key: featuredSeries,
  //     // onFinish: //console.log,
  //   });
  // };

  // useEffect(() => {
  //   //console.log('bookSaleSchedules', bookSaleSchedules);
  // }, [bookSaleSchedules]);

  const router = useRouter();
  const liveAuctionBooks = (bookSaleSchedules?.[auctionKey] ?? []).map(
    (book) => ({
      coverInfo: {
        countDown: '01:52:09 left 🔥',
        startDate: new Date(book.startDate ?? Date.now()),
        endDate: new Date(book.endDate ?? ''),
        coverImg: book.asset.thumbnail ?? book.asset.coverImage ?? '',
        menuItems: [],
      },
      cardData: {
        title: book.title ?? '',
        actionTitle: getSaleTypeActionTitle(book.saleType ?? ''),
        placeBid: () => {
          router.push(`/assets/${book?._id}/${book?.saleId}`);
        },
        iconURL: book.user?.avatar ?? generateAvatar(book.user?.walletAddress),
        itemPrice: toEther(
          String(book.latestOffer == '0' ? book.price : book.latestOffer)
        ),
        rates: '1/1',
        count: book.asset.likes ?? '0',
        inWishlist: true,
        blockchain: book.blockChain,
        genres: book.asset.genres,
      },
    })
  );
  const lunchingAuctionBook = (bookSaleSchedules?.[upcoming] ?? []).map(
    (book) => ({
      coverInfo: {
        countDown: '01:52:09 left 🔥',
        startDate: new Date(book.startDate ?? Date.now()),
        endDate: new Date(book.endDate ?? Date.now()),
        coverImg: book.asset.thumbnail ?? book.asset.coverImage ?? '',
        menuItems: [],
      },
      cardData: {
        title: book.title ?? '',
        actionTitle: book.saleType ?? '',
        placeBid: () => {
          router.push(`/assets/${book?._id}/${book?.saleId}`);
        },
        iconURL: book.user?.avatar ?? generateAvatar(book.user?.walletAddress),
        itemPrice: toEther(book.price),
        blockchain: book.blockChain,
        count: book.asset.likes ?? '0',
        inWishlist: true,
        genres: book.asset.genres,
      },
    })
  );

  // const seriesView = (allSeries ?? []).map((data) => ({
  //   ...data,
  //   cardType: 'series',
  //   coverInfo: {
  //     coverImg: data.image,
  //     menuItems: [],
  //   },
  //   cardData: {
  //     inWishlist: false,
  //     count: data?.subscribers ?? '0',
  //     iconURL: data.user?.avatar ?? generateAvatar(data?.user?.walletAddress),
  //     ...data,
  //     cardType: 'series',
  //   },
  //   handleViewCreatedAsset: () => {
  //     router.push(`/assets/series/${get(data, '_id')}`);
  //   },
  // }));

  {
    /*const seriesFilter = () => {*/
  }
  {
    /*  return (*/
  }
  //     <div className="filter-form">
  //       <Form name="control-hooks">
  //         <div className={'mfc'}>
  //           <div role="halfs" className="half left-filter">
  //             <Form.Item name="GENRE_OPTIONS">
  {
    /*              <Select*/
  }
  //                 placeholder="GENRE_OPTIONS"
  //                 onChange={onGENRE_OPTIONSChangeChange}
  {
    /*                allowClear*/
  }
  {
    /*                dropdownMatchSelectWidth={250}*/
  }
  {
    /*                options={GENRE_OPTIONS}*/
  }
  {
    /*              />*/
  }
  {
    /*            </Form.Item>*/
  }
  {
    /*          </div>*/
  }
  //         </div>
  //         <div className={'mobile-mfc'}>
  {
    /*          <Row gutter={[0, 20]}>*/
  }
  {
    /*            <Col span={24}>*/
  }
  {
    /*              <Form.Item name="GENRE_OPTIONS">*/
  }
  {
    /*                <Select*/
  }
  //                   placeholder="GENRE_OPTIONS"
  //                   onChange={onGENRE_OPTIONSChangeChange}
  {
    /*                  allowClear*/
  }
  {
    /*                  dropdownMatchSelectWidth={250}*/
  }
  {
    /*                  options={GENRE_OPTIONS}*/
  }
  //                 />
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //         </div>
  //       </Form>
  //     </div>
  //   );
  // };
  return (
    <>
      <section className="mid">
        <div className="container">
          {/* <section className={'marketPlaceBanner'}>
            <a
              onClick={() =>
                router.push('/competition/63823de17f5842757b00ed0a')
              }
            >
              <Image src={'/images/enrollment-banner.png'} />
            </a>
          </section> */}
          {/*// <section className="tail">*/}
          {/*  <div className="container">*/}
          {/*    <CardCarousel*/}
          {/*      filter={seriesFilter()}*/}
          {/*      title="Featured Series"*/}
          {/*      cards={seriesView}*/}
          {/*      loading={loadingSeries}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</section>*/}
          <CardCarousel
            title="Live Auction 🔥"
            cards={liveAuctionBooks}
            loading={loading}
          />
          <CardCarousel
            title="Selling Soon 🔥"
            cards={lunchingAuctionBook}
            loading={loading}
          />
        </div>
      </section>
    </>
  );
};
