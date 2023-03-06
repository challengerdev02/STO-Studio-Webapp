import Text from 'antd/lib/typography/Text';
import { Button, Col, Divider, Form, FormInstance, Row, Select } from 'antd';
import { MarketplaceCard, MarketplaceCardType } from '../../marketplace-card';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLoader } from '@/components/isomorphic';

export interface SelectItem {
  label?: string;
  value: string;
}

export interface BrowseNFTProps {
  form?: FormInstance<any> | undefined;
  onFinish: any;
  browseAuctionNfts: MarketplaceCardType[];

  onBlockChangeChange: (values: any) => void;
  blockSelectItems: SelectItem[];

  onGENRE_OPTIONSChangeChange: (values: any) => void;
  genreselectItems: SelectItem[];

  onSalesTypeChange: (values: any) => void;
  salesSelectItems: SelectItem[];

  onPriceRangeChange: (values: any) => void;
  priceSelectItems: SelectItem[];

  recentlyAddedCB: (values: any) => void;
  loadMore: (values: any) => void;
  loadingState: boolean;
  showLoad?: boolean;
}

export const BrowseNFT = (props: BrowseNFTProps) => {
  const {
    form,
    onFinish,
    browseAuctionNfts,
    onBlockChangeChange,
    onGENRE_OPTIONSChangeChange,
    onPriceRangeChange,
    onSalesTypeChange,
    recentlyAddedCB,
    blockSelectItems,
    genreselectItems,
    salesSelectItems,
    priceSelectItems,
    loadMore,
    loadingState,
    showLoad,
  } = props;
  const [hideFilters, setHideFilters] = useState(true);
  return (
    <>
      <Text className="heading">Browse NFTs</Text>
      <div className="filter-form">
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <div className="mfc">
            <Form.Item name="filter" className="filter-toggle-btn">
              <Button
                htmlType="button"
                role={'filter-toggle-btn'}
                onClick={() => setHideFilters((old) => !old)}
                className="filter-btn"
                icon={
                  <i className={`mc-filter-${hideFilters ? 'line' : 'fill'}`} />
                }
              >
                {!hideFilters ? 'Hide' : 'Show'} filters
              </Button>
            </Form.Item>
            <div role="halfs" className="half left-filter">
              <Form.Item name="block-chain">
                <Select
                  placeholder="Asset Type"
                  onChange={onBlockChangeChange}
                  allowClear
                  clearIcon={<i className="mc-close-circle-fill mc-lg" />}
                >
                  {blockSelectItems.map((item, key) => (
                    <Select.Option key={`${key}`} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="GENRE_OPTIONS">
                <Select
                  placeholder="GENRE_OPTIONS"
                  onChange={onGENRE_OPTIONSChangeChange}
                  allowClear
                  dropdownMatchSelectWidth={250}
                >
                  {genreselectItems.map((item, key) => (
                    <Select.Option key={`${key}`} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="sale-type">
                <Select
                  placeholder="Sale Type"
                  onChange={onSalesTypeChange}
                  allowClear
                >
                  {salesSelectItems.map((item, key) => (
                    <Select.Option key={`${key}`} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {/*<Form.Item name="price-range">*/}
              {/*  <Select*/}
              {/*    placeholder="Price Range"*/}
              {/*    onChange={onPriceRangeChange}*/}
              {/*    allowClear*/}
              {/*  >*/}
              {/*    {priceSelectItems.map((item, key) => (*/}
              {/*      <Select.Option key={`${key}`} value={item.value}>*/}
              {/*        {item.label}*/}
              {/*      </Select.Option>*/}
              {/*    ))}*/}
              {/*  </Select>*/}
              {/*</Form.Item>*/}
            </div>
            <div role="halfs" className="half right-filter">
              <Form.Item name="recently-added">
                <Button
                  htmlType="button"
                  onClick={recentlyAddedCB}
                  className="filter-btn"
                  icon={<i className="mc-filter-line"></i>}
                >
                  Recently added
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className={`mobile-mfc ${hideFilters ? 'hide' : ''}`}>
            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Form.Item name="block-chain">
                  <Select
                    placeholder="Asset Type"
                    onChange={onBlockChangeChange}
                    allowClear
                    clearIcon={<i className="mc-close-circle-fill mc-lg" />}
                  >
                    {blockSelectItems.map((item, key) => (
                      <Select.Option key={`${key}`} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="GENRE_OPTIONS">
                  <Select
                    placeholder="GENRE_OPTIONS"
                    onChange={onGENRE_OPTIONSChangeChange}
                    allowClear
                  >
                    {genreselectItems.map((item, key) => (
                      <Select.Option key={`${key}`} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="sale-type">
                  <Select
                    placeholder="Sale Type"
                    onChange={onSalesTypeChange}
                    allowClear
                  >
                    {salesSelectItems.map((item, key) => (
                      <Select.Option key={`${key}`} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="price-range">
                  <Select
                    placeholder="Price Range"
                    onChange={onPriceRangeChange}
                    allowClear
                  >
                    {priceSelectItems.map((item, key) => (
                      <Select.Option key={`${key}`} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
      <Divider className="main" />
      <div className="browse-cards">
        {browseAuctionNfts.map((nft, key) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (key || 1) }}
            key={key}
          >
            <MarketplaceCard {...nft} />
          </motion.div>
        ))}
      </div>
      <div className="auto-container">
        {browseAuctionNfts.length == 0 && !loadingState ? (
          <span>No result</span>
        ) : (
          ''
        )}
        {showLoad ? (
          <Button onClick={loadMore}>
            <span>Load more</span>{' '}
            {loadingState ? <MainLoader height={20} width={20} /> : ''}
          </Button>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
