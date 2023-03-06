import styled from 'styled-components';
import { Button, Col, Divider, Input, Select, Switch } from 'antd';

const { TextArea } = Input;

export const MainWrapper = styled.div`
  justify-content: start;
  align-items: center;
  //margin: 49px 240px 114px;
  overflow: hidden;
  width: 80%;

  .book-cover-image {
    border-radius: 12px !important;
    //object-fit: cover;
    //width: 100%;
    // height: 100% !important;
    // max-height: 300px;
  }

  @media (max-width: 400px) {
    margin: 0;
  }

  @media only screen and (min-width: 400px) and (max-width: 1024px) {
    margin: 5px;
  }
  @media only screen and (max-width: 1439px) {
    & {
      width: 100%;
      padding: 24px;
    }
  }

  @media only screen and (min-width: 1440px) {
    & {
      padding-top: 50px;
    }
  }
`;

export const Wrapper = styled.div`
  padding: 40px 40px 128px 40px;
  background: var(--card-homepage-color);
  border-radius: 16px;
  margin-top: 51px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  @media (max-width: 400px) {
    padding: 20px 10px;
    margin-top: 40px;
    width: 100%;
  }

  @media only screen and (min-width: 400px) and (max-width: 1024px) {
    padding: 20px;
    margin-top: 40px;
  }
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--heading-color);

  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

export const BoldText = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--heading-color);
`;

export const Text = styled.div`
  font-size: 12px;
  color: var(--text-color-secondary);

  @media (max-width: 400px) {
    font-size: 10px;
  }
`;

export const Heading = styled.div`
  font-size: 48px;
  color: var(--heading-color);
  font-weight: 700;

  @media (max-width: 400px) {
    font-size: 20px;
    width: 100%;
  }

  @media only screen and (min-width: 400px) and (max-width: 1024px) {
    font-size: 30px;
  }
`;

export const InputField = styled(Input)`
  //margin-top: 12px !important;

  :focus {
    color: var(--dropdown-arrow-color) !important;
  }

  @media (max-width: 400px) {
    align-items: center;
    justify-content: center;
  }
`;

export const TextAreaField = styled(TextArea)`
  //margin-top: 12px !important;
`;

export const SelectField = styled(Select)`
  //margin-top: 12px !important;
  border-radius: 12px;
  height: 48px;

  @media only screen and (min-width: 400px) and (max-width: 1024px) {
    width: 300px;
  }

  @media (max-width: 400px) {
    width: 270px;
  }
`;

export const SeriesDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Line = styled(Divider)`
  border: 1px solid var(--divider-color);
  margin: 40px 0 !important;
`;

export const AntSwitch = styled(Switch)`
  //:not(.ant-switch-checked) {
  //  background-color: var(--divider-color) !important;
  //}
`;

export const StyledI = styled.i`
  font-size: 25px;
  color: var(--icon-dark-color);
`;

export const Arrow = styled.i`
  font-size: 25px;
  padding-left: 10px;
  height: 100%;
  display: flex;
`;

export const StyledButton = styled(Button)`
  width: 163px !important;
  height: 48px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  @media (max-width: 400px) {
    width: 140px !important;
  }
`;

export const StyledCol = styled(Col)`
  padding: 0 !important;
  margin: 0 !important;
  height: auto !important;
  width: 100% !important;
  border-radius: 16px !important;
`;

// export default CreateBook;
