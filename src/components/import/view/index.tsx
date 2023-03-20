import { Container } from '../../marketplace/marketplace-view/index.styled';

import { useRouter } from 'next/router';
import { Card, Col, Row, Select, Space, Spin, Image } from 'antd';
import { ImportOutlined, LoadingOutlined } from '@ant-design/icons';
import { CollectionsNamespace } from '@/shared/namespaces/collections';
import { SUPPORTED_NETWORKS } from 'src/blockchain/evm/utils';
import Text from 'antd/lib/typography/Text';
import { StyledMeta } from '../index.styled';
import { truncate } from 'lodash';
import { SOLANA_CHAIN_ID } from '@/shared/constants';

interface ImportViewProps {
  signedAddress?: string;
  loadingNFts: boolean;
  nfts: {
    address?: string;
    title: string;
    description: string;
    image: string;
    tokenId: number;
    verified?: boolean;
  }[];
  chainId: number | string;
  // selectedChainId: number;
}
export const ImportView = (props: ImportViewProps) => {
  const router = useRouter();
  const { loadingNFts, chainId, nfts, signedAddress } = props;

  return (
    <Container style={{ width: '80%', textAlign: 'left' }}>
      <div
        className="content-profile"
        style={{ width: '100%', textAlign: 'left' }}
      >
        <h1 className={'title'}>Import Your ERC721 NFTs to Ordinals</h1>
        {loadingNFts && (
          <Spin>
            <LoadingOutlined />
          </Spin>
        )}
        {!loadingNFts && (
          <>
            <Row>
              <Col>
                <Select
                  style={{ width: 200 }}
                  value={chainId}
                  onChange={(v) => router.push(`/import?chainId=${v}`)}
                  options={[
                    {
                      value: 1,
                      label: (
                        <Space>
                          <div style={{ height: 28 }}>
                            {SUPPORTED_NETWORKS[1].icon}
                          </div>{' '}
                          <Text>Ethereum</Text>
                        </Space>
                      ),
                    },
                    {
                      value: 137,
                      label: (
                        <Space>
                          <div style={{ height: 28 }}>
                            {SUPPORTED_NETWORKS[137].icon}
                          </div>{' '}
                          <Text>Polygon</Text>
                        </Space>
                      ),
                    },
                    {
                      value: SOLANA_CHAIN_ID,
                      label: (
                        <Space>
                          <img
                            src={SUPPORTED_NETWORKS[SOLANA_CHAIN_ID].icon}
                            width={24}
                            height={24}
                          />{' '}
                          <Text>Solana</Text>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              {nfts.map((nft, index) => {
                return (
                  <Col
                    key={`nft${index}`}
                    offset={1}
                    xs={{ span: 24 }}
                    sm={{ span: 16, offset: 0 }}
                    md={{ span: 8, offset: 0 }}
                    lg={{ span: 8, offset: 0 }}
                    xl={{ span: 6, offset: 0 }}
                  >
                    <Card
                      style={{
                        width: 240,
                        height: 370,
                        overflow: 'hidden',
                        margin: 10,
                      }}
                      actions={[
                        <Space
                          onClick={() =>
                            router.push(
                              chainId == process.env.SOLANA_CHAIN_ID
                                ? `/collection/${signedAddress}/${nft.address}/${nft.tokenId}/solana`
                                : `/collection/${signedAddress}/${nft.address}/${nft.tokenId}`
                            )
                          }
                          key={'importButton'}
                        >
                          <ImportOutlined
                            style={{ color: '#ffffff' }}
                            key={'importButton'}
                          />{' '}
                          <Text>Import</Text>
                        </Space>,
                        // <Button key={'importButton'} size='small' style={{margin: 'auto'}} shape='round'>Import to Ordinal</Button>
                      ]}
                      type={'inner'}
                      size={'small'}
                      extra={
                        nft.verified && (
                          <Image
                            width={20}
                            alt="Verified"
                            src="/assets/verified-icon.svg"
                          />
                        )
                      }
                      title={nft.title}
                      cover={
                        <Image
                          style={{
                            cursor: 'pointer',
                            height: '300 !important',
                          }}
                          onClick={() =>
                            router.push(
                              chainId == process.env.SOLANA_CHAIN_ID
                                ? `/collection/${signedAddress}/${nft.address}/${nft.tokenId}/solana`
                                : `/collection/${signedAddress}/${nft.address}/${nft.tokenId}`
                            )
                          }
                          src={nft.image}
                          preview={false}
                          alt={nft.title}
                          fallback={
                            'data:image/png;base64,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'
                          }
                        />
                      }
                    >
                      <StyledMeta
                        title={`${truncate(nft.address, {
                          length: 8,
                        })}${nft.address?.substring(
                          nft?.address.length - 6,
                          nft?.address?.length
                        )}`}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>

            {/* <section className="left">
        <div style={{width: '80%'}}>
            <Space size={20} direction={'vertical'}>
              <Select
              options={[{value: 1, label: "Ethereum"}]}
              />
        
            </Space>
         
        </div>
      </section> */}
          </>
        )}
      </div>
    </Container>
  );
};
