import React, { ReactNode } from 'react';
import { Tab, Wrapper } from './index.styled';

interface IsomorphicTabProps {
  children: ReactNode | ReactNode[];
  border?: string;
  height?: string;
  padding?: string;
  maxWidth?: string;
}

export const IsomorphicTab = (props: IsomorphicTabProps) => {
  const { children, ...rest } = props;
  return (
    <Wrapper data-testid="isomorphic-tab" className="isomorphic-tab-wrapper">
      <Tab {...rest} defaultActiveKey="1" type="card">
        {children}
      </Tab>
    </Wrapper>
  );
};
