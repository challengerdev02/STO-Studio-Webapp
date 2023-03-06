import { StyledModal } from '../fullscreen-menu/index.styled';
// import { Header } from '../index.styled';
import {
  Avatar,
  Button,
  Divider,
  Input,
  List,
  Space,
  Spin,
  Typography,
} from 'antd';
import { motion } from 'framer-motion';
import { BookNamespace } from '@/shared/namespaces/book';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { debounce, get, isEmpty } from 'lodash';
import Link from 'next/link';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { truncateEthAddress } from '@/shared/utils';

interface SearchDialogProps {
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  walletAddress?: string;
  onSearch: (value: string) => void;
  items: BookNamespace.SearchItem;
  isSearching: boolean;
  clearSearch: () => void;
}

const { Title } = Typography;

export const SearchDialog = (props: SearchDialogProps) => {
  const {
    onVisibilityChange,
    visibility,
    onSearch,
    clearSearch,
    isSearching,
    items,
  } = props;

  const [searchValue, setSearchValue] = useState<string | undefined>();

  const debouncedSearch = useMemo(() => {
    return debounce(onSearch, 500);
  }, []);

  const onSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setSearchValue(target.value);

    if (!isEmpty(target.value)) {
      debouncedSearch(target.value);
    } else {
      clearSearch();
    }
  };

  return (
    <StyledModal
      title={null}
      centered
      visible={visibility}
      // onOk={() => setVisible(false)}
      onCancel={() => onVisibilityChange(false)}
      width={'100vw'}
      bodyStyle={{
        overflow: 'hidden',
        // height: 'calc(100vh - 160px)',
        padding: 0,
      }}
      mask={false}
      destroyOnClose
      forceRender={false}
      footer={null}
    >
      <div
        role="search-header meta-flex meta-flex-col"
        style={{ gap: 25, padding: 20, display: 'flex', flexFlow: 'column' }}
      >
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            className="toggle-menu"
            type="default"
            shape={'circle'}
            size={'small'}
            onClick={() => onVisibilityChange(false)}
            icon={<i className="mc-close-line" />}
          />
        </motion.div>

        <Input
          style={{ width: '100%' }}
          allowClear
          placeholder="Item, Collection, Artist, etc."
          prefix={<i className="mc-search-line" />}
          onChange={onSearchValueChange}
          value={searchValue}
        />
      </div>
      {/*<div style={{ padding: 0, paddingTop: 0 }}>*/}
      <Divider />
      {isEmpty(searchValue) && (
        <div className="meta-flex meta-align-center w-100 meta-flex-j-c">
          <Title level={5} style={{ color: 'var(--text-color-secondary)' }}>
            Search by Book, Accounts, etc.
          </Title>
        </div>
      )}
      <div>
        {isEmpty(items.assets) && isEmpty(items.accounts) && isSearching && (
          <div
            style={{
              width: '100%',
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spin />
          </div>
        )}
        {!isEmpty(items.assets) && (
          <List
            itemLayout="horizontal"
            dataSource={items.assets?.slice(0, 6)}
            size={'small'}
            header={
              <div style={{ paddingLeft: 20, fontWeight: 500 }}>Assets</div>
            }
            loading={isSearching}
            renderItem={(item) => (
              <List.Item
                className={'button-list-desktop-search-overlay-item'}
                onClick={() => {
                  setSearchValue(undefined);
                  clearSearch();
                  onVisibilityChange(false);
                }}
              >
                <Link href={`/assets/${item._id}/${item.saleId}`} passHref>
                  <a
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Space size={20}>
                      <Avatar src={item?.asset?.coverImage} />
                      <span>{item?.asset?.title}</span>
                    </Space>

                    {/*{CryptoIcons['eth']}*/}
                  </a>
                </Link>
              </List.Item>
            )}
          />
        )}
        {!isEmpty(items.accounts) && (
          <List
            itemLayout="vertical"
            dataSource={items.accounts?.slice(0, 6)}
            size={'small'}
            loading={isSearching}
            header={
              <div
                style={{
                  paddingLeft: 20,
                  paddingTop: 10,
                  fontWeight: 500,
                  borderTop: '1px solid var(--border)',
                }}
              >
                Accounts
              </div>
            }
            renderItem={(item) => (
              <List.Item
                className={'button-list-desktop-search-overlay-item'}
                onClick={() => {
                  setSearchValue(undefined);
                  clearSearch();
                  onVisibilityChange(false);
                }}
              >
                <Link href={`/${item.walletAddress}`} passHref>
                  <a
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Space size={20}>
                      {item.avatar ? (
                        <Avatar src={item.avatar} />
                      ) : (
                        <Avatar
                          data-testid="search-user-avatar"
                          icon={
                            <GradientAvatar
                              size={36}
                              value={get(item, 'walletAddress', 'Metacomics')}
                            />
                          }
                        />
                        // <GradientAvatar value={item.walletAddress} />
                      )}
                      <span>
                        {item.username ??
                          truncateEthAddress(item.walletAddress)}
                      </span>
                    </Space>
                  </a>
                </Link>
              </List.Item>
            )}
          />
        )}

        {!isEmpty(searchValue) && (
          <div
            className={'button-list-desktop-search-overlay-footer'}
            onClick={() => {
              setSearchValue(undefined);
              clearSearch();
            }}
          >
            <Link passHref href={`/assets/search?q=${searchValue}`}>
              <a>
                <div>Press enter to search all items</div>
              </a>
            </Link>
          </div>
        )}
      </div>
      {/*</div>*/}
    </StyledModal>
  );
};
