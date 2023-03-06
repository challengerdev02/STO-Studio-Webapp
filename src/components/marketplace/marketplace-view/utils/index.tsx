import { Image } from 'antd';

export interface TrendingImagesProps {
  images: string[];
}

export const TrendingImages = ({ images }: TrendingImagesProps) => {
  const allImages = images.map((image, key) => {
    return (
      <Image key={key} alt="..." preview={{ visible: false }} src={image} />
    );
  });
  return <div className="trending-flex">{allImages}</div>;
};
