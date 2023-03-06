import { ReactNode } from 'react';
import { SelectMenu } from './index.styled';

export interface IsomorphicSelectProps extends Record<string, any> {
  children?: ReactNode | ReactNode[];
}

export const IsomorphicSelect = (props: IsomorphicSelectProps) => {
  const { children, ...rest } = props;

  return (
    <SelectMenu
      data-testid="isomorphic-select"
      defaultValue="Blockchain"
      bordered={false}
      suffixIcon={<i className="mc-arrow-down-simple-line mc-2x down-arrow" />}
      {...rest}
    >
      {children}
    </SelectMenu>
  );
};
