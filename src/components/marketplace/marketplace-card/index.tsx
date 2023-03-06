import { MarketplaceCardContainer } from './container';
import { BodyComponent } from './body';
import { motion } from 'framer-motion';
import React from 'react';
import { Badge } from 'antd';

export interface MarketplaceCardType {
  cardType?: string;
  cardData?: Record<string, any>;
  coverInfo: Record<string, any>;
  bordered?: boolean;
  hoverable?: boolean;
  style?: object;
  cover?: any;
  href?: string;
  handleViewCollection?: () => void;
  handleViewCreatedAsset?: () => void;
}

export const MarketplaceCard = ({
  coverInfo,
  cardData,
  href,
  ...props
}: MarketplaceCardType) => {
  const onTap = (e: any) => {
    e.preventDefault();
    return (
      props.handleViewCollection ??
      props.handleViewCreatedAsset ??
      cardData?.placeBid ??
      cardData?.previewCollection ??
      cardData?.previewCreatedAsset
    )(e);
  };
  const card = (
    <MarketplaceCardContainer
      {...coverInfo}
      {...props}
      className="main-mc-container"
      role="MarketplaceCardContainer"
    >
      <BodyComponent
        blockchain={cardData?.['blockchain']}
        {...cardData}
        metadata={coverInfo.metadata}
        {...props}
      />
    </MarketplaceCardContainer>
  );

  return (
    <motion.div
      whileTap={{ scale: 0.985 }}
      whileHover={{ scale: 0.99 }}
      style={{ cursor: 'pointer', display: 'inline-block' }}
      // onClick={onTap}
      // transition={{ duration: ((index || 1) + 1) * 0.1 }}
    >
      <a
        onClick={onTap}
        className="main-mc-button"
        type={'text'}
        href={href ?? '/'}
      >
        {/*{cardData?.cardType!='series' && <Badge.Ribbon*/}
        {/*  text={'Action'}*/}
        {/*  color={'blue'}*/}
        {/*  style={{marginRight: 30, marginTop: 120, paddingRight: 5}}*/}
        {/*>{card} </Badge.Ribbon>}*/}
        {/*else {card};*/}
        {cardData?.cardType != 'series' && (
          <Badge.Ribbon
            text={cardData?.genres
              ?.map((d: any) => String(d).substring(0, 10))
              .join(', ')}
            color="rgba(0, 0, 0, 0.5)"
            style={{ marginRight: 30, marginTop: 140, paddingRight: 10 }}
          >
            {card}
          </Badge.Ribbon>
        )}
        {cardData?.cardType == 'series' && card}
      </a>
    </motion.div>
  );
};
