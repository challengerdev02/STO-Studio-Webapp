import {
  CurrencyIconContainer,
  CustomCardColoredStyledBox,
  SpacedFlexContainer,
  StackImageContainer,
} from '../container';
import { CustomStyledText } from '../typography';
import {
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  SlidersOutlined,
} from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import { CustomStyledImage } from '../image';
import { isEmpty } from 'lodash';
import formatNumber from 'format-number';
import {
  SUPPORTED_NETWORKS,
  SUPPORTED_USD_TOKENS,
} from '../../../../blockchain/evm/utils';

export interface BodyComponentType {
  title?: string;
  name?: string;
  blockchain: string;
  genres?: string[];
  metadata?: Record<string, any>;
  contentRating?: string;
  explicitContent?: boolean;
  description?: string;
  placeBid?: () => void;
  itemPrice?: string;
  rates?: string;
  iconURL?: string;
  count?: string;
  inWishlist?: boolean;
  urlList?: string[];
  actionTitle?: string;
  handleViewCollection?: () => void;
  handleViewCreatedAsset?: () => void;
  cardType?: string;
}

export const BodyComponent = (props: BodyComponentType) => {
  const numberFormat = formatNumber();
  const chain = SUPPORTED_NETWORKS[props.blockchain];
  const token: any = SUPPORTED_USD_TOKENS[props.blockchain];
  // console.table(props);
  let action: any;
  let label = '';
  switch (props.cardType) {
    case 'collection':
      action = props.handleViewCollection;
      break;
    case 'createdAsset':
    case 'series':
      action = props.handleViewCreatedAsset;
      break;
    default:
      action = props.placeBid;
      break;
  }
  switch (props.cardType) {
    case 'collection':
    case 'createdAsset':
      label = '';
      break;
    case 'series':
      action = 'Views';
      break;
    default:
      label = props.actionTitle ?? 'Place a bid';
      break;
  }
  const actionButton = (
    <Button
      onClick={() => action()}
      type="link"
      style={{
        padding: 0,
        fontSize: '14px',
        fontWeight: 600,
        margin: ' 0 0 0 4.5px',
        lineHeight: '160%',
        height: 'fit-content',
      }}
    >
      <SlidersOutlined style={{ color: 'var(--disabled-color)' }} />
      {label}
    </Button>
  );
  return (
    <>
      <SpacedFlexContainer>
        <CustomStyledText fontSize="14px" fontWeight={500}>
          {props.cardType === 'collection' && (
            <span>
              {props.metadata?.type?.toLowerCase() == 'book'
                ? 'Book: '
                : 'Art: '}
            </span>
          )}
          {(props.cardType === 'series'
            ? String(
                props?.genres?.map((g) => String(g).substring(0, 10)).join(', ')
              )
            : String(props.title ? props.title : props.name)
          ).substring(0, props.cardType === 'collection' ? 25 : 30)}
        </CustomStyledText>
        <span>
          {!isEmpty(props.iconURL) && (
            <CustomCardColoredStyledBox
              borderRadius="200px"
              width="24px"
              height="24px"
            >
              <CustomStyledImage
                width={'100%'}
                src={props.iconURL}
                alt={props.title}
              />
            </CustomCardColoredStyledBox>
          )}
        </span>
      </SpacedFlexContainer>
      <SpacedFlexContainer>
        {props.cardType != 'series' && (
          <span>
            <CustomStyledText
              fontSize="12px"
              line_height="20px"
              fontWeight={300}
            >
              {props.cardType === 'createdAsset' ||
              props.cardType === 'series' ? (
                ' '
              ) : props.cardType === 'collection' ? (
                props.genres!?.join(', ') ?? props?.metadata!?.book
              ) : (
                <Space size={10} align={'center'}>
                  <CurrencyIconContainer>{token?.icon}</CurrencyIconContainer>
                  <span>{props.itemPrice}</span>
                  {token?.symbol}
                </Space>
              )}
            </CustomStyledText>
            <CustomStyledText
              fontSize="12px"
              margin="0 0 0 4.5px"
              fontWeight={500}
              muted
            />
          </span>
        )}
        <span>
          {props.inWishlist != undefined &&
            props.cardType !== 'createdAsset' && (
              <>
                {}
                {props.inWishlist ? (
                  <HeartFilled role="InWishlist" />
                ) : String(props.cardType) !== 'series' ? (
                  <HeartOutlined role="NotInWishlist" />
                ) : (
                  <EyeOutlined role="NotInWishlist" />
                )}
                <CustomStyledText
                  fontSize="14px"
                  line_height="160%"
                  margin=" 0 0 0 4.5px"
                  fontWeight={600}
                >
                  {Intl != undefined
                    ? new Intl.NumberFormat(undefined, {
                        notation: 'compact',
                        compactDisplay: 'short',
                      }).format(Number(props.count))
                    : numberFormat(Number(props.count), {})}
                </CustomStyledText>
              </>
            )}
        </span>
      </SpacedFlexContainer>
      {props.cardType !== 'series' && (
        <>
          <Divider />

          <SpacedFlexContainer>
            <StackImageContainer width="auto">
              <CurrencyIconContainer size={20}>
                {chain?.['icon']}
              </CurrencyIconContainer>
            </StackImageContainer>
            <span>{actionButton}</span>
          </SpacedFlexContainer>
        </>
      )}
    </>
  );
};
