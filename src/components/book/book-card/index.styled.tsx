import styled from 'styled-components';
import { Button, Dropdown, Menu, Typography } from 'antd';

const { Paragraph } = Typography;

export const Wrapper = styled.div`
  min-height: 185px !important;
  display: flex;
  justify-content: space-between;
  padding: 19px !important;
  background: var(--background-primary) !important;
  border-radius: 8px !important;

  @media (max-width: 1112px) {
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 13px !important;
  }

  @media (max-width: 413px) {
    flex-wrap: wrap;
    padding: 13px !important;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 413px) {
    gap: 10px;
  }
`;

export const ImgContainer = styled.div`
  width: 145.24px;
  height: 100%;
  min-height: 145.24px;
  border-radius: 8px;
  overflow: hidden;
  background: transparent;

  @media (max-width: 768px) {
    width: 145.24px;
  }

  @media (max-width: 413px) {
    width: 105.24px;
  }
`;

export const Img = styled.img`
  width: 100%;
  object-fit: cover;
  min-height: 100%;
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: calc(100% - 165.24px);

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    width: calc(100% - 145.24px);
  }

  @media (max-width: 413px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    width: calc(100% - 115.24px);
  }
`;

export const Title = styled.div`
  color: var(--heading-color);
  font-size: 20px;
  font-weight: 700;
  width: 100%;
`;

export const ByText = styled.div`
  color: var(--text-color-secondary);
  font-size: 16px;
  font-weight: 700;
  margin-top: 4px;
  width: 100%;
`;

export const DescribeText = styled(Paragraph)`
  display: flex;
  flex-wrap: wrap;
  color: var(--text-color-secondary) !important;
  font-size: 16px;
  width: 100%;
  max-width: 570px;
  overflow: hidden;
  margin-top: 7px;
  width: 100%;

  .read_more {
    color: var(--text-color) !important;
    font-weight: normal !important;
    font-size: 16px !important;
  }
`;
export const SecondDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ThirdDiv = styled.div`
  display: flex;
  gap: 12px;
  align-items: start;
  padding-top: 7px;
`;

export const SellButton = styled(Button)`
  width: 93px !important;
  height: 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 90px !important;
  background: var(--accent) !important;
  color: var(--heading-color) !important;
  font-weight: 700 !important;
`;

export const Options = styled.div`
  background: var(--dropdown-background-color-dark);
  border-radius: 100%;
  height: 36px;
  width: 36px;
`;

export const OptionsInner = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color-secondary);
  cursor: pointer;
`;
export const DropDownMenu = styled(Dropdown)``;

export const MenuItem = styled(Menu.Item)`
  &:hover {
    background: transparent !important;
    color: var(--text-color) !important;
  }
`;

export const StyledMenu = styled(Menu)`
  background-color: var(--dropdown-background-color-dark);
  border-radius: 16px;
  border: none !important;
  backdrop-filter: blur(32px);
  box-shadow: 0px 40px 64px -12px rgba(0, 0, 0, 0.08),
    0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-top: 15px;
`;
