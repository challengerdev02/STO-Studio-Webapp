import styled from 'styled-components';
import { Button, Card } from 'antd';

export const Wrapper = styled(Card)`
  & {
    width: 282px !important;
    height: 500px !important;
    border-radius: 16px !important;
    border: 1px solid var(--border);
  }
  @media only screen and (min-width: 1024px) and (max-width: 1399px) {
    & {
      width: 299.5px !important;
    }
  }
  .ant-card-body {
    padding: 0px !important;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
`;

export const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  /* width: 100%; */
  /* height: 200px; */
  border-radius: 16px;
  align-items: center;
  margin: 24px 24px auto 24px !important;
`;

export const Img = styled.img`
  width: 100%;
  height: 233px;
  object-fit: fill;
  border-radius: 16px;
  aspect-ratio: 1/1;
`;

export const Btn = styled(Button)`
  background: var(--accent) !important;
  border-radius: 90px !important;
  height: 40px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: fit-content !important;
  align-self: center;
  /* margin-top: 12px !important; */
`;

export const BoldText = styled.span`
  color: var(--heading-color);
  font-size: 14px;
  font-weight: 700;
`;

export const SellText = styled.span`
  color: var(--heading-color);
  font-weight: 700;
  font-size: 14px;
`;

export const Description = styled.div`
  padding: 18px 30px !important;
  display: flex;
  justify-content: start;
  align-self: start;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  .ant-typography {
    margin-bottom: 0 !important;
    //color: var(--text-color-secondary) !important;
  }
`;
