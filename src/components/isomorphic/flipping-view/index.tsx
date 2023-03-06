import { useCallback, useEffect, useRef } from 'react';
import { BookBlock } from '@/shared/book-block';

export interface FlippingViewProps {
  images: Array<{ src: string; otherProps?: any }>;
  height?: number;
  currentPage: number;
}

export const FlippingView = (props: FlippingViewProps) => {
  const { images, currentPage } = props;
  const bookRef = useRef<BookBlock | null>(null);

  const renderAllImage: any = images.map((image, key) => {
    return (
      <div className={'react-bb-item'} key={key}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={'react-bb-item-img'} alt="..." src={image.src} />
      </div>
    );
  });

  const ref = useCallback((node: HTMLDivElement) => {
    if (node) {
      bookRef.current = new BookBlock(node, {
        orientation: 'vertical',
        speed: 800,
        shadowSides: 0.8,
        shadowFlip: 0.7,
        autoplay: false,
        startPage: 0,
      });
      bookRef.current?.startSlideshow();
    }
  }, []);

  useEffect(() => {
    if (bookRef.current) bookRef.current?.jump(currentPage + 1);
    //console.log(
    //   'bookref bookRef.current bookRef.currentvbookRef.current',
    //   bookRef.current,
    //   currentPage
    // );
  }, [currentPage]);
  return (
    <div
      style={{ width: '100%', height: '100%' }}
      className={'meta-flex meta-flex-center meta-flex-col'}
    >
      <div id="react-bb-bookblock" className="react-bb-bookblock" ref={ref}>
        {renderAllImage}
      </div>
    </div>
  );
};
