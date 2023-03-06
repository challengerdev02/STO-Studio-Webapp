export const TraderABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'AssetPurchased',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'offerId',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
        ],
        internalType: 'struct Offer',
        name: 'offer',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'offerSignature',
        type: 'bytes',
      },
    ],
    name: 'acceptOffer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptedToken',
    outputs: [
      {
        internalType: 'contract IToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'assetAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum ITEM_TYPE',
        name: '',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'assetAddresses',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'assetSale',
    outputs: [
      {
        internalType: 'bool',
        name: 'mint',
        type: 'bool',
      },
      {
        internalType: 'enum SALE_TYPE',
        name: 'saleType',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'assetId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxSupply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'saleId',
        type: 'string',
      },
      {
        internalType: 'enum ITEM_TYPE',
        name: 'assetType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'royalty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'bookCreators',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'mint',
            type: 'bool',
          },
          {
            internalType: 'enum SALE_TYPE',
            name: 'saleType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'assetId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'enum ITEM_TYPE',
            name: 'assetType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'royalty',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Sale',
        name: 'sale',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'saleSignature',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'traderSignature',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'bidSignature',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'winnerSignature',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'edition',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'bookBaseURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'pageBaseURI',
            type: 'string',
          },
          {
            internalType: 'string[]',
            name: 'pageURIs',
            type: 'string[]',
          },
          {
            internalType: 'string[]',
            name: 'editors',
            type: 'string[]',
          },
          {
            internalType: 'string',
            name: 'version',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'proxyAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'proxyRegistry',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bookAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'deployerVersion',
            type: 'uint256',
          },
        ],
        internalType: 'struct BookAsset',
        name: 'asset',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'assetSignature',
        type: 'bytes',
      },
    ],
    name: 'buyAuctionBook',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'mint',
            type: 'bool',
          },
          {
            internalType: 'enum SALE_TYPE',
            name: 'saleType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'assetId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'enum ITEM_TYPE',
            name: 'assetType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'royalty',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Sale',
        name: 'sale',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'saleSignature',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'traderSignature',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'edition',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'bookBaseURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'pageBaseURI',
            type: 'string',
          },
          {
            internalType: 'string[]',
            name: 'pageURIs',
            type: 'string[]',
          },
          {
            internalType: 'string[]',
            name: 'editors',
            type: 'string[]',
          },
          {
            internalType: 'string',
            name: 'version',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'proxyAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'proxyRegistry',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bookAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'deployerVersion',
            type: 'uint256',
          },
        ],
        internalType: 'struct BookAsset',
        name: 'asset',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'assetSignature',
        type: 'bytes',
      },
    ],
    name: 'buyNowBook',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'mint',
            type: 'bool',
          },
          {
            internalType: 'enum SALE_TYPE',
            name: 'saleType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'assetId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'enum ITEM_TYPE',
            name: 'assetType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'royalty',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Sale',
        name: 'sale',
        type: 'tuple',
      },
    ],
    name: 'cancelSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'claimedAuction',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'comic',
    outputs: [
      {
        internalType: 'contract IToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'edition',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'bookBaseURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'pageBaseURI',
            type: 'string',
          },
          {
            internalType: 'string[]',
            name: 'pageURIs',
            type: 'string[]',
          },
          {
            internalType: 'string[]',
            name: 'editors',
            type: 'string[]',
          },
          {
            internalType: 'string',
            name: 'version',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'proxyAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'proxyRegistry',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bookAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'deployerVersion',
            type: 'uint256',
          },
        ],
        internalType: 'struct BookAsset',
        name: 'item',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'creatorVersion',
        type: 'uint256',
      },
    ],
    name: 'createBook',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'createdBooks',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'crypto',
    outputs: [
      {
        internalType: 'contract ICrypto',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'db',
    outputs: [
      {
        internalType: 'contract IDatabase',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'edition',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'bookBaseURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'pageBaseURI',
            type: 'string',
          },
          {
            internalType: 'string[]',
            name: 'pageURIs',
            type: 'string[]',
          },
          {
            internalType: 'string[]',
            name: 'editors',
            type: 'string[]',
          },
          {
            internalType: 'string',
            name: 'version',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'proxyAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'proxyRegistry',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bookAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'deployerVersion',
            type: 'uint256',
          },
        ],
        internalType: 'struct BookAsset',
        name: 'book',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'bookSignature',
        type: 'bytes',
      },
    ],
    name: 'deployBook',
    outputs: [
      {
        internalType: 'address',
        name: 'bookAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'deployedContracts',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeAccount',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeX100',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum ITEM_TYPE',
        name: 'assetType',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'assetId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'creatorVersion',
        type: 'uint256',
      },
    ],
    name: 'getAssetAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'bookId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'creatorVersion',
        type: 'uint256',
      },
    ],
    name: 'getBookAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'feeAccount_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'proxyRegistryAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tradeAdmin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'paymentTokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'database',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'cryptoAddress',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'itemOwners',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'lastPurchased',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestBookCreatorVersion',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestPageCreatorVersion',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'maxQuantityPerOrder',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxRoyaltyPercentX100',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'nfts',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'operators',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'orderCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'pageCreators',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proxyRegistry',
    outputs: [
      {
        internalType: 'contract IProxyRegistry',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'saleBookCreator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'mint',
            type: 'bool',
          },
          {
            internalType: 'enum SALE_TYPE',
            name: 'saleType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'assetId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'enum ITEM_TYPE',
            name: 'assetType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'royalty',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Sale',
        name: 'sale',
        type: 'tuple',
      },
    ],
    name: 'saleStats',
    outputs: [
      {
        internalType: 'uint256',
        name: 'maxSupply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sold',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'unsold',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'sendToken',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'reciever',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'sendTokenFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'setAcceptedTokenAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cryptoAddress',
        type: 'address',
      },
    ],
    name: 'setCryptoAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'database',
        type: 'address',
      },
    ],
    name: 'setDatabase',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_feeX100',
        type: 'uint256',
      },
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'setFeeAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'max',
        type: 'uint256',
      },
    ],
    name: 'setMaxQuantityPerOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountX100',
        type: 'uint256',
      },
    ],
    name: 'setMaxRoyalty',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'paymentToken',
        type: 'address',
      },
    ],
    name: 'setPaymentToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_registry',
        type: 'address',
      },
    ],
    name: 'setProxyRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'setTakeFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool',
      },
    ],
    name: 'setTradeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'takeFees',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'mint',
            type: 'bool',
          },
          {
            internalType: 'enum SALE_TYPE',
            name: 'saleType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'assetId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'saleId',
            type: 'string',
          },
          {
            internalType: 'enum ITEM_TYPE',
            name: 'assetType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'royalty',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Sale',
        name: 'sale',
        type: 'tuple',
      },
    ],
    name: 'tokensLeft',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'tradeAdmins',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'usedNonces',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'addrs',
        type: 'address[]',
      },
    ],
    name: 'validNfts',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'isValid',
        type: 'bool[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
