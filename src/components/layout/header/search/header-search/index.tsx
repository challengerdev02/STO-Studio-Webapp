import { Avatar, Button, Input, List, Popover, Space, Spin } from 'antd';
import Link from 'next/link';
import { BookNamespace } from '@/shared/namespaces/book';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { debounce, get, isEmpty } from 'lodash';
import { truncateEthAddress } from '@/shared/utils';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { useRouter } from 'next/router';

interface HeaderSearchProps {
  onSearch: (value: string) => void;
  items: BookNamespace.SearchItem;
  isSearching: boolean;
  clearSearch: () => void;
}
export const HeaderSearch = (props: HeaderSearchProps) => {
  const { onSearch, clearSearch, isSearching, items } = props;

  const [searchValue, setSearchValue] = useState<string | undefined>();

  const [showPopover, setShowPopover] = useState(false);

  const { query, asPath } = useRouter();

  const { q: searchQuery } = query;

  const searchOverlayRef = useCallback(() => {
    const buttonInput = document.querySelector(
      '.button-list-desktop .ant-input-affix-wrapper.ant-popover-open'
    );

    const content = document.querySelector(
      '.button-list-desktop-search-overlay .ant-popover-content'
    ) as HTMLDivElement | null;

    if (content && buttonInput) {
      const boundingRect = buttonInput.getBoundingClientRect();
      content.style.width = `${boundingRect.width}px`;
      content.style.padding = '0px !important';
    }
  }, []);

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

  useEffect(() => {
    if (RegExp(`assets|search`).test(asPath) && searchQuery) {
      setSearchValue(searchQuery as string);
    }
  }, [searchQuery, asPath]);

  useEffect(() => {
    setShowPopover(
      (!isEmpty(searchValue) && isSearching) ||
        (!isEmpty(searchValue) &&
          (!isEmpty(items.assets) || !isEmpty(items.accounts)))
    );
  }, [searchValue, items, isSearching]);

  return (
    <Popover
      placement="bottom"
      title={null}
      content={
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
              itemLayout="horizontal"
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
        </div>
      }
      ref={searchOverlayRef}
      visible={showPopover}
      overlayClassName={'button-list-desktop-search-overlay'}
      getPopupContainer={() => {
        const element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.top = '0';
        element.style.zIndex = '999';
        document.body.appendChild(element);
        return element;
      }}
    >
      <Input
        placeholder="Item, Collection, Artist"
        style={{ width: '100%' }}
        value={searchValue}
        onChange={onSearchValueChange}
        suffix={
          <Button
            type={'text'}
            className={'meta-flex meta-flex-center'}
            onClick={() => {
              if (!isEmpty(searchValue)) {
                setSearchValue(undefined);
                clearSearch();
              }
            }}
          >
            {isEmpty(searchValue) && <i className="mc-search-line" />}
            {!isEmpty(searchValue) && <i className="mc-close-line" />}
          </Button>
        }
      />
    </Popover>
  );
};
