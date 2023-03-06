import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useState } from 'react';
import styled from 'styled-components';
import {
  ImageViewComponentStyled,
  ImageViewComponentType,
} from '../image-viewer[thumbnail]';
import { ImageView } from '../image-viewer[thumbnail]/main-view';

export const NavComponentStyled = styled.div`
  & {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 767.42px !important;
  }
  span {
    font-weight: 700;
    font-size: 13px;
    line-height: 24px;
  }

  @media only screen and (min-width: 1024px) {
    & {
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    & {
      width: 383px !important;
    }
  }
  @media only screen and (max-width: 480px) {
    & {
      width: 366px !important;
    }
  }
`;

export const ImageViewNavComponent = ({ images }: ImageViewComponentType) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <ImageViewComponentStyled className="image-view-container">
      {images[0] ? (
        <ImageView
          className="main-image-view"
          role="main-image-view"
          src={images[currentImage].src}
        />
      ) : (
        <></>
      )}

      <NavComponentStyled role={'nav-container'}>
        <Button
          role={'previous-slide-btn'}
          type="text"
          onClick={() =>
            setCurrentImage((old) => {
              if (old == 0) return images.length - 1;
              return old - 1;
            })
          }
        >
          <i className="mc-arrow-left-2-line mc-2x"></i>
        </Button>
        <Text>
          <span className="current" role={'current-slide'}>
            {currentImage + 1}
          </span>
          <span>/</span>
          <span className="total">{images.length}</span>
        </Text>
        <Button
          role={'next-slide-btn'}
          type="text"
          onClick={() =>
            setCurrentImage((old) => {
              if (old == images.length - 1) return 0;
              return old + 1;
            })
          }
        >
          <i className="mc-arrow-right-2-line mc-2x"></i>
        </Button>
      </NavComponentStyled>
    </ImageViewComponentStyled>
  );
};
