import styled from 'styled-components';
import { Divider } from 'antd';

export const Card = styled.div`
  width: 308px;
  max-width: 100%;
  height: 365px;
  border: 1px solid var(--border-color-base);
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    height: 183px;
    flex-direction: row;
  }
`;
export const CardImageContainer = styled.div`
  width: 308px;
  max-width: 100%;
  height: 200px;
  border-radius: 16px 16px 0px 0px;

  @media only screen and (max-width: 768px) {
    width: 100px;
    border-radius: 16px 0px 0px 16px;
    height: 100%;
  }

  @media only screen and (max-width: 320px) {
    border-radius: 16px 0px 0px 16px;
    width: 138px !important;
  }
`;
export const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  min-height: 100%;
  border-radius: 16px 16px 0px 0px;

  @media only screen and (max-width: 768px) {
    border-radius: 16px 0px 0px 16px;
  }
`;

export const CardContent = styled.div`
  width: 308px;
  max-width: 100%;
  height: auto;
  padding: 16px;

  .card-content-inner {
    width: 308px;
    max-width: 100%;
    height: auto;
    display: flex;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  .left-col {
    width: 184px;
    height: 46px;
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .left-col-row {
    width: 100%;
    height: 20px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: var(--text-color-secondary) !important;
    line-height: 24px;
  }
  .left-col-row-variant {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: rgba(252, 252, 253, 1) !important;
    padding-top: 6px;
  }

  .right-col {
    width: 124px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;

    @media only screen and (max-width: 768px) {
      width: 100%;
      padding-top: 6px;
      flex-direction: column-reverse;
    }

    .row-wrapper {
      @media only screen and (max-width: 768px) {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }

    .right-col-row {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 6px;
      font-weight: normal !important;
      font-size: 16px !important;
      line-height: 24px !important;
      color: rgba(252, 252, 253, 1) !important;

      @media only screen and (max-width: 768px) {
        justify-content: flex-start;
      }
    }

    .last-typeof-right-col-row {
      width: inherit;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: rgba(252, 252, 253, 1) !important;
      column-gap: 5px;

      @media only screen and (max-width: 768px) {
        width: inherit;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        column-gap: 5px;
      }
    }
  }
  .last-typeof-right-col-row {
    @media only screen and (max-width: 768px) {
      width: inherit;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      column-gap: 5px;
    }
  }
  @media only screen and (max-width: 768px) {
    width: 208px;
  }

  @media only screen and (max-width: 320px) {
    width: 170px !important;
  }
`;

export const Row = styled.div`
  width: 308px;
  max-width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
export const RowCell = styled.div`
  display: flex;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 24px !important;
  color: var(--text-color-secondary) !important;
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  color: var(--text-color-primary) !important;
  column-gap: 5px;
  margin-bottom: 3px;

  .likes {
    color: rgba(230, 230, 235, 1) !important;
    display: flex;
    column-gap: 5px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 7px;
  }
`;
export const Logo = styled.img``;
export const Hr = styled(Divider)`
  margin: 12px 0px !important;
  background: var(--border-color-split) !important;

  @media only screen and (max-width: 768px) {
    margin: 6px 0px 10px 0px !important;
  }
`;
export const OptionsInner = styled.span`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color-secondary);
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
