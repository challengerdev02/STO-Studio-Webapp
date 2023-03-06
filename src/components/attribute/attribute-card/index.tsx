import { Space } from 'antd';
import React, { ReactNode } from 'react';
import { Circle, Text, Wrapper } from './index.styled';
import { isString } from 'lodash';

interface Props {
  icon?: ReactNode;
  title?: string;
  bottomText?: any;
  backgroundColor: string;
}

export const AttributesCard = (props: Props) => {
  const { icon, title, bottomText, backgroundColor } = props;

  return (
    <Wrapper bordered={false} data-testid="attributes-card-container">
      <Space direction="vertical">
        <Space size="middle">
          <Circle
            style={{ background: backgroundColor }}
            data-testid="card-icon"
          >
            {icon && icon}
          </Circle>
          {title && (
            <Text
              style={{ textTransform: 'uppercase' }}
              data-testid="attributes-card-container-title"
            >
              {title}
            </Text>
          )}
        </Space>
        <Text data-testid="attributes-card-container-bottom-text">
          {isString(bottomText)
            ? bottomText
            : bottomText.format('MMM DD, YYYY')}
        </Text>
      </Space>
    </Wrapper>
  );
};
