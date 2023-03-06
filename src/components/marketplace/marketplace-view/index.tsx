// import Text from 'antd/lib/typography/Text';
import { Container } from './index.styled';
// import { ImageViewComponent } from '../../isomorphic/image-viewer[thumbnail]';
import { MarketplaceCardType } from '../marketplace-card';
import { BrowseNFT, BrowseNFTProps } from './browse';
import { CardCarousel } from './carousel';

// import { TrendingImages } from './utils';

export interface NFTProps {
  imageUrl: string;
  name: string;
}

export interface SelectItem {
  label: string;
  value: string;
}

export interface MarketPlaceProps {
  featuredNfts: NFTProps[];
  trendingNfts: NFTProps[];
  liveAuctionNfts: MarketplaceCardType[];
  lunchingAuctionNfts: MarketplaceCardType[];

  browse: BrowseNFTProps;
}

export const MarketPlace = (props: MarketPlaceProps) => {
  const {
    // featuredNfts,
    // trendingNfts,
    liveAuctionNfts,
    lunchingAuctionNfts,
    browse,
  } = props;
  return (
    <Container>
      {/*<section className="main-section">*/}
      {/*  <div className="featured half">*/}
      {/*    <Text className="heading">Featured</Text>*/}
      {/*    <ImageViewComponent*/}
      {/*      images={featuredNfts.map((nft) => ({ src: nft.imageUrl }))}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="trending half">*/}
      {/*    <Text className="heading">Trending</Text>*/}
      {/*    <TrendingImages images={trendingNfts.map((nft) => nft.imageUrl)} />*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className="mid">
        <div className="container">
          <CardCarousel
            title="Selling Soon 🔥"
            cards={lunchingAuctionNfts.map((nft) => ({ ...nft }))}
          />

          <CardCarousel
            title="Live Auction 🔥"
            cards={liveAuctionNfts.map((liveAuctionNft) => ({
              ...liveAuctionNft,
            }))}
          />
        </div>
        {/*</section>*/}
        {/*<section className="tail">*/}
        <div className="container">
          <BrowseNFT {...browse} />
        </div>
      </section>
    </Container>
  );
};
