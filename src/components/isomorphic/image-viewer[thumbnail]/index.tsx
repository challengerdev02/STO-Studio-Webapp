import { useState } from 'react';
import styled from 'styled-components';
import { Image } from 'antd';
import { ImageView } from './main-view';

export const ImageViewComponentStyled = styled.div`
  & {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 20px;
  }

  .main-image-view {
    display: flex !important;
    width: 100% !important;
    height: 100% !important;
    //height: 536.32px !important;
    //width: 767.42px !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden;
    border-radius: 11.7639px;

    .ant-image {
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    img {
      width: auto !important;
      height: 100% !important;
      position: absolute;
    }
  }

  @media only screen and (min-width: 1024px) {
    & {
      /* width: 366px!important; */
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    .main-image-view {
      height: 440px !important;
      width: 383px !important;
    }
  }
  @media only screen and (max-width: 480px) {
    .main-image-view {
      height: 440px !important;
      width: 366px !important;
    }
  }
`;

export const ThumbnailComponentStyled = styled.div`
  & {
    display: inline-block !important;
    white-space: nowrap;
    width: 100%;
    overflow-x: scroll;
    width: 767.42px !important;
  }

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  .thumbnail-image-view {
    display: inline-flex !important;
    height: 56.91px !important;
    width: 84.99px !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden;
    border-radius: 6px;
    margin-right: 10.5px !important;

    .ant-image {
      pointer-events: visible !important;
      cursor: pointer;
    }

    img {
      width: 100% !important;
      height: auto !important;
    }
  }

  .active-thumbnail {
    border: 2px solid var(--accent);
    box-sizing: border-box;
    border-radius: 6px;

    img {
      border: 0 !important;
    }
  }

  @media only screen and (min-width: 1024px) {
    & {
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    & {
      width: 383px !important;
    }

    .thumbnail-image-view {
      height: 63.74px !important;
      width: 70.2px !important;
    }
  }
  @media only screen and (max-width: 480px) {
    & {
      width: 366px !important;
    }

    .thumbnail-image-view {
      height: 63.74px !important;
      width: 95.6px !important;
    }
  }
`;

export interface ImageViewComponentType {
  images: Array<{ src: string; otherProps?: any }>;
  width?: string;
  onThumbnailChange?: (data: any) => void;
}

export const ImageViewComponent = (props: ImageViewComponentType) => {
  const { images = [], onThumbnailChange = () => {} } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [visible, setVisible] = useState(false);

  return (
    <ImageViewComponentStyled className="image-view-container">
      {images && images[0] ? (
        <>
          <ImageView
            className="main-image-view"
            preview={{ visible: false }}
            role="main-image-view"
            src={images[currentImage].src}
            onClick={() => setVisible(true)}
          />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup
              preview={{
                visible,
                onVisibleChange: (vis) => setVisible(vis),
                current: currentImage,
              }}
            >
              {images.map((image, index) => (
                <Image
                  key={`@@preview-${index}`}
                  src={image.src}
                  alt="...."
                  onClick={() => {
                    setCurrentImage(index);
                    onThumbnailChange(index);
                  }}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        </>
      ) : (
        <></>
      )}
      <ThumbnailComponentStyled
        role="thumbnail-container"
        className="thumbnail-container"
      >
        {images.map((image, key) => (
          <ImageView
            onClick={() => {
              setCurrentImage(key);
              onThumbnailChange(key);
            }}
            role="unit-thumbnail"
            nopreview={'true'}
            className={`thumbnail-image-view ${
              currentImage == key ? 'active-thumbnail' : ''
            }`}
            src={image.src}
            key={key}
          />
        ))}
      </ThumbnailComponentStyled>
    </ImageViewComponentStyled>
  );
};
