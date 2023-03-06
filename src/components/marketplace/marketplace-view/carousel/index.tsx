import { MainLoader } from '@/components/isomorphic';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import { motion } from 'framer-motion';
import { MarketplaceCard, MarketplaceCardType } from '../../marketplace-card';
import { clamp, snakeCase } from 'lodash';
import { useRef } from 'react';

export interface CardCarouselProps {
  cards: MarketplaceCardType[];
  title: string;
  loading?: boolean;
  filter?: any;
  key?: string;
}

export const CardCarousel = (props: CardCarouselProps) => {
  const { title, cards, loading = false, filter, key } = props;
  const cardKeyBase = `${snakeCase(title)}-${key + '-' ?? ''}slidable-card-`;
  const currentKey = useRef<number>(0);
  const handleTransition = (back: boolean = false) => {
    const currentKeyValue = currentKey.current;
    const keySource = document.querySelector(
      `[data-slider-key=${cardKeyBase}${currentKeyValue}]`
    );
    const slider = document.querySelector(`.slider.${cardKeyBase}`);

    if (keySource != null && slider != null) {
      const child = keySource.querySelector('.ant-card-cover') as HTMLElement;

      if (back) {
        slider.scrollLeft -= (child?.offsetWidth ?? 0) + 28;
        currentKey.current = clamp(currentKey.current - 1, 0, cards.length - 1);
      } else {
        slider.scrollLeft += (child?.offsetWidth ?? 0) + 28;
        currentKey.current = clamp(currentKey.current + 1, 0, cards.length - 1);
      }
      return;
    }
  };

  const allCards = cards.map((market_card, key) => {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 * (key || 1) }}
        key={key}
        data-slider-key={`${cardKeyBase}${key}`}
      >
        <MarketplaceCard {...market_card} />
      </motion.span>
    );
  });
  return (
    <>
      <div className="title">
        <Text className="heading">{title}</Text>

        <div className="navs">
          <Button
            role={'previous-slide-btn'}
            shape="circle"
            onClick={(_: any) => handleTransition(true)}
          >
            <i
              className="mc-arrow-left-2-line mc-2x"
              role={'previous-slide-btn-i'}
            />
          </Button>
          <Button
            role={'next-slide-btn'}
            shape="circle"
            onClick={(_: any) => handleTransition(false)}
          >
            <i
              className="mc-arrow-right-2-line mc-2x"
              role={'next-slide-btn-i'}
            />
          </Button>
        </div>
      </div>
      <div> {filter}</div>

      <div className={`slider ${cardKeyBase}`}>
        {!loading && allCards}
        {!cards.length ? (
          loading ? (
            <>Loading...</>
          ) : (
            <div>No {title} items found</div>
          )
        ) : (
          <div
            style={{ height: '50vh', display: !loading ? 'none' : '' }}
            className={'meta-flex-center meta-flex'}
          >
            <MainLoader height={40} width={40} />
          </div>
        )}
      </div>
    </>
  );
};
