import React, { useState } from 'react';
import {
  ByText,
  Container,
  DescribeText,
  DropDownMenu,
  Img,
  ImgContainer,
  InnerContainer,
  MenuItem,
  Options,
  OptionsInner,
  SecondDiv,
  SellButton,
  StyledMenu,
  ThirdDiv,
  Title,
  Wrapper,
} from './index.styled';

const menu = (
  <StyledMenu>
    <MenuItem
      key="0"
      style={{
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '24px',
        color: 'var(--text-color-secondary)',
      }}
    >
      <i className="mc-chart-bar-line" style={{ marginRight: '12px' }} />
      Edit Listing
    </MenuItem>
    <MenuItem
      key="1"
      style={{
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '24px',
        color: 'var(--text-color-secondary)',
      }}
    >
      <i className="mc-coupon-discount-line" style={{ marginRight: '12px' }} />
      Sell as NFT
    </MenuItem>
    <MenuItem
      key="3"
      style={{
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '24px',
        color: 'var(--text-color-secondary)',
      }}
    >
      <i className="mc-design-grid-fill" style={{ marginRight: '12px' }} />
      Preview
    </MenuItem>
  </StyledMenu>
);
interface PropType {
  title: string;
  author: string;
  description: string;
  imageUrl: any;
}

export const BookCard = (props: PropType) => {
  const { title, author, description, imageUrl } = props;
  const [ellipsis] = useState(true);

  return (
    <Wrapper data-testid="create-book">
      <Container>
        <ImgContainer>
          <Img data-testid="display-image" src={imageUrl} />
        </ImgContainer>

        <InnerContainer>
          <SecondDiv>
            {' '}
            <Title data-testid="book-title">{title}</Title>
            <ByText data-testid="book-author">by @{author}</ByText>
            <DescribeText
              data-testid="book-description"
              ellipsis={
                ellipsis
                  ? {
                      rows: 3,
                      expandable: true,
                      symbol: <span className="read_more">Read More</span>,
                    }
                  : false
              }
            >
              {description}
            </DescribeText>
          </SecondDiv>

          <ThirdDiv>
            <SellButton>Sell</SellButton>
            <DropDownMenu
              overlay={menu}
              trigger={['click']}
              overlayStyle={{
                width: '280px',
                height: '176px',
              }}
              placement="bottomRight"
            >
              <Options data-testid="options">
                <OptionsInner>...</OptionsInner>
              </Options>
            </DropDownMenu>
          </ThirdDiv>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
};
