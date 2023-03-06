import Text from 'antd/lib/typography/Text';
import styled from 'styled-components';

export interface CustomStyledTextType {
  fontSize?: string;
  fontWeight?: number;
  line_height?: string;
  margin?: string;
  padding?: string;
  color?: string;
  muted?: any;
}

export const CustomStyledText = styled(Text)`
  &.ant-typography {
    font-size: ${(props: CustomStyledTextType) => props.fontSize || 'inherit'};
    font-weight: ${(props) => props.fontWeight || 'inherit'};
    line-height: ${(props) => props.line_height || 'inherit'};
    color: ${(props) =>
      props.muted ? 'var(--disabled-color)' : props.color || ''} !important;
    padding: ${(props) => props.padding || 'inherit'};
    margin: ${(props) => props.margin || 'inherit'};
  }
`;
