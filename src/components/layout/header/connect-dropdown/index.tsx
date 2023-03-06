import { Button, ButtonProps, Divider } from 'antd';
import Link from 'next/link';

export interface UnitListItemProps extends ButtonProps {
  link?: string | boolean;
  label?: string;
  iconString?: string;
}

export const UnitListItem = ({
  link = '',
  label,
  iconString,
  ...rest
}: UnitListItemProps) => {
  if (link) {
    return (
      <Link passHref href={link as string}>
        <a className="list-item" role="dd-list-item">
          <div>
            {iconString && <i className={`${iconString} mc-lg`} />}
            {label}
          </div>
        </a>
      </Link>
    );
  }
  return (
    <Button
      type={'text'}
      className="list-item"
      role="dd-list-item"
      icon={iconString && <i className={`${iconString} mc-lg`} />}
      style={{ ...(rest?.style ?? {}), paddingLeft: 0, paddingRight: 0 }}
      {...rest}
    >
      {label}
    </Button>
  );
};

interface DropdownProps {
  logout: () => void;
  onShowBalance?: () => void;
}

export const DropDownContent = (props: DropdownProps) => {
  const { logout, onShowBalance } = props;
  return (
    <div className="container" role={'dd-container'}>
      <UnitListItem link="/account" label="Profile" />
      <UnitListItem onClick={onShowBalance} label="Your Wallet" />
      <UnitListItem link="/account/settings" label="Profile Settings" />
      <Divider />
      <UnitListItem
        link="/accounts?tab=created"
        label="Created Series"
        iconString="mc-design-grid-fill"
      />
      <UnitListItem
        link="/accounts?tab=sale"
        label="My NFTs on Sale"
        iconString="mc-chart-bar-line"
      />
      <UnitListItem
        link="/accounts?tab=collected"
        label="Collected NFTs"
        iconString="mc-heart-line"
      />

      <Divider />
      <UnitListItem
        link="https://metacomic.tawk.help"
        label="Resource Center"
        iconString="mc-bar-01-average-fill"
      />
      <Divider />
      {/*<UnitListItem link="/account" label="Account settings" />*/}
      <UnitListItem link={false} label="Log out" onClick={logout} />
    </div>
  );
};
