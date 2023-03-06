import React from 'react';
import { Typography } from 'antd';
import {
  Wrapper,
  Img,
  Btn,
  SellText,
  BoldText,
  ImageDiv,
  Description,
} from './index.styled';
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

export const CharacterCard = (props: Props) => {
  const { description, artists, title, img, onRevise } = props;

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 0.98 }}
      style={{ cursor: 'pointer' }}
      onClick={onRevise}
    >
      <Wrapper bordered={false}>
        <ImageDiv>
          <Img src={img} alt="img" />
        </ImageDiv>
        <Description>
          <Paragraph
            ellipsis={{ rows: 2, expandable: false, symbol: 'Read More' }}
          >
            <Title level={5} style={{ color: 'var(--heading-color)' }}>
              {title}
            </Title>
          </Paragraph>
          <Paragraph
            ellipsis={{ rows: 3, expandable: false, symbol: 'Read More' }}
          >
            <BoldText>Description: </BoldText>
            {description}
          </Paragraph>

          <Paragraph
            ellipsis={{ rows: 3, expandable: false, symbol: 'Read More' }}
          >
            <BoldText>Artists: </BoldText>
            {artists}
          </Paragraph>

          <Btn>
            <SellText>Sell Character</SellText>
          </Btn>
        </Description>
      </Wrapper>
    </motion.div>
  );
};
