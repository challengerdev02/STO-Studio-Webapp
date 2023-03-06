import { Container } from '@/components/marketplace/marketplace-view/index.styled';
import Head from 'next/head';
import { Fragment } from 'react';
import { BrowseAuctionSection } from './browse';
// import { FeaturedAndTrendingSection } from './featured';
import { LiveAuctionAndLaunchingSoonSection } from './live';

export const MarketplaceContainer = () => {
  return (
    <Fragment>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home Page of Meta Comic" />
      </Head>
      <Container>
        {/*<FeaturedAndTrendingSection />*/}
        <LiveAuctionAndLaunchingSoonSection />
        <BrowseAuctionSection />
      </Container>
    </Fragment>
  );
};
