import { Dropdown, Menu } from 'antd';

export interface DropDownMenuType {
  menuItems: string[] | undefined;
  onDropDown?: () => void;
}

export const renderMenuItems = (list: string[] | undefined = []) => {
  const renderlist = list.map((item, index) => (
    <Menu.Item key={index}>{item}</Menu.Item>
  ));
  return <Menu>{renderlist}</Menu>;
};

export const DropDownMenu = ({ menuItems, onDropDown }: DropDownMenuType) => {
  return (
    <Dropdown.Button
      onClick={onDropDown}
      overlay={renderMenuItems(menuItems)}
    />
  );
};
