import React, { ReactChildren, ReactNode } from 'react';
import { CustomDrawer } from './index.styled';
import { DrawerProps } from 'antd';

interface IsomorphicDrawerProps extends DrawerProps {
  children?: ReactNode | ReactChildren;
  onClose?: () => void;
  visible?: boolean;
}

export const IsomorphicDrawer = (props: IsomorphicDrawerProps) => {
  const { children, visible, onClose, ...rest } = props;

  return (
    <>
      <CustomDrawer
        closable
        placement="bottom"
        size={'large'}
        onClose={onClose}
        visible={visible}
        data-testid={'drawer-container'}
        {...rest}
      >
        {children}
      </CustomDrawer>
    </>
  );
};
