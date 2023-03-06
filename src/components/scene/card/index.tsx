import React from 'react';
import { Typography } from 'antd';
import { BoldText, Description, ImageDiv, Img, Wrapper } from './index.styled';
import { motion } from 'framer-motion';

const { Title } = Typography;

interface Props {
  description: string;
  artists: string;
  // attributes: string;
  title: string;
  img: any;
  onRevise: () => void;
}

const { Paragraph } = Typography;

export const SceneCard = (props: Props) => {
  const { description, artists, title, img, onRevise } = props;

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 0.98 }}
      style={{ cursor: 'pointer' }}
      onClick={onRevise}
    >
      <Wrapper bordered={false} data-testid="scene-card">
        <ImageDiv>
          <Img data-testid="cover-image" src={img} alt="img" />
        </ImageDiv>
        <Description>
          <Paragraph
            ellipsis={{ rows: 2, expandable: false, symbol: 'Read More' }}
          >
            <Title
              data-testid="scene-title"
              level={5}
              style={{ color: 'var(--heading-color)' }}
            >
              {title}
            </Title>
          </Paragraph>
          <Paragraph
            ellipsis={{ rows: 3, expandable: false, symbol: 'Read More' }}
          >
            <BoldText data-testid="scene-description">Description: </BoldText>
            {description.substring(0, 100)}
          </Paragraph>

          <Paragraph
            ellipsis={{ rows: 3, expandable: false, symbol: 'Read More' }}
          >
            {!!artists && (
              <BoldText data-testid="scene-artist">Artists: </BoldText>
            )}
            {artists}
          </Paragraph>

          {/*<Btn data-testid="sell-btn">*/}
          {/*  <SellText>Sell Scene</SellText>*/}
          {/*</Btn>*/}
        </Description>
      </Wrapper>
    </motion.div>
  );
};
