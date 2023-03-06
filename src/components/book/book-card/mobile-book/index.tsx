import styled from 'styled-components';
import { Button, Card, Dropdown, Menu, Space, Typography } from 'antd';
import React from 'react';

interface Props {
  simulateMobile: boolean;
  title: string;
  author: string;
  description: string;
  imageUrl: any;
}

const { Paragraph } = Typography;

export const MobileBook = (props: Props) => {
  const { simulateMobile, author, title, description, imageUrl } = props;

  const menu = (
    <Menu
      style={{
        backgroundColor: 'var(--dropdown-background-color-dark)',
        borderRadius: '16px',
        border: 'none !important',
        backdropFilter: 'blur(32px)',
        boxShadow:
          '0px 40px 64px -12px rgba(0, 0, 0, 0.08), 0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        marginTop: '15px',
      }}
    >
      <MenuItem
        key="0"
        style={{
          fontWeight: 600,
          fontSize: '15px',
          lineHeight: '24px',
          color: 'var(--text-color-grey)',
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
        <i
          className="mc-coupon-discount-line"
          style={{ marginRight: '12px' }}
        />
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
    </Menu>
  );

  if (!simulateMobile) {
    return <div>Mobile</div>;
  }

  return (
    <Wrapper bordered={false}>
      <Div>
        <div style={{ width: '100%' }}>
          <ImgWrapper>
            <Img data-testid="img" src={imageUrl} />
          </ImgWrapper>
        </div>

        <div>
          <Title data-testid="mobile-book-title">{title}</Title>
          <By data-testid="author">by @{author}</By>

          <Description data-testid="description">
            <ParagraphItem
              ellipsis={{ expandable: true, symbol: 'Read More', rows: 3 }}
            >
              {description}
            </ParagraphItem>
          </Description>

          <SpaceSide size="middle">
            <SellButton>Sell</SellButton>
            <Dropdown
              overlay={menu}
              trigger={['click']}
              overlayStyle={{
                width: '280px',
                height: '176px',
              }}
            >
              <Options>
                <OptionsInner>...</OptionsInner>
              </Options>
            </Dropdown>
          </SpaceSide>
        </div>
      </Div>
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  .ant-card-body {
    padding: 15px 40px 15px 16px !important;
    background: var(--background-secondary) !important;
    // height: 262px;
    border-radius: 8px !important;
    max-width: 366px !important;
    border: 1px solid var(--border) !important;

    @media (max-width: 400px) {
      width: 100% !important;
      height: auto !important;
      padding: 15px 10px 15px 10px !important;
    }
  }
  display: flex !important;
  flex-wrap: wrap;
  max-width: 366px;
`;

const ImgWrapper = styled.div`
  height: 230.38px;
  width: 145.24px;
  border-radius: 8px;

  @media (max-width: 400px) {
    width: 100% !important;
    justify-content: center;
    display: flex;
  }
`;

const Img = styled.img`
  width: inherit;
  object-fit: contain;
  border-radius: 8px;

  @media (max-width: 400px) {
    object-fit: cover;
  }
`;

const Title = styled.div`
  color: var(--header-color);
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
`;

const By = styled.div`
  color: var(--text-color-secondary);
`;

const Description = styled.div`
  color: var(--text-color-secondary);
  display: -webkit-box;
  max-width: 200px;
  overflow: hidden;
  margin-top: 12px;
`;

const Div = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 400px) {
    width: 100% !important;
    flex-direction: column !important;
  }
`;

const SellButton = styled(Button)`
  width: 93px !important;
  height: 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 90px !important;
  background: var(--accent) !important;
  color: var(--heading-color) !important;
  font-weight: 700 !important;
  border: none !important;
`;

const MenuItem = styled(Menu.Item)`
  &:hover {
    background: transparent !important;
    color: var(--text-color) !important;
  }
`;

const Options = styled.div`
  background: var(--dropdown-background-color-dark);
  border-radius: 100%;
  height: 36px;
  width: 36px;
`;

const OptionsInner = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color-secondary);
  cursor: pointer;
`;

const SpaceSide = styled(Space)`
  margin-top: 14px;
`;

const ParagraphItem = styled(Paragraph)`
  color: var(--text-color-secondary) !important;

  a.ant-typography-expand {
    color: var(--heading-color) !important;
    outline: 0;
    cursor: pointer;
  }
`;
