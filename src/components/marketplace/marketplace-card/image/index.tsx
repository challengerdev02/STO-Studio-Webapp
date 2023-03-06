import styled from 'styled-components';
import { CustomCardColoredStyledBox } from '../container';

export interface CustomStyledImageType {
  width?: string;
  height?: string;
}

export const CustomStyledImage = styled.img`
  & {
    width: ${(props: CustomStyledImageType) => props.width || 'inherit'};
    height: ${(props) => props.height || 'inherit'};
    border-radius: 12px;
  }
`;

export const generateStackedImage = (urlList: string[] = []) => {
  return urlList.map((item, key) => (
    <CustomCardColoredStyledBox
      key={key}
      position={key}
      className="stacked-img"
      role="stackImages"
      borderRadius="200px"
      width="24px"
      height="24px"
    >
      <CustomStyledImage width={'100%'} src={item} alt="stack-image" />
    </CustomCardColoredStyledBox>
  ));
};
