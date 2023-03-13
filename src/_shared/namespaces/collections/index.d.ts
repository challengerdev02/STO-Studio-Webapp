import { AppObject } from '@/shared/namespaces';

export namespace CollectionsNamespace {
  export interface Collections extends AppObject {
    token_address: string;
    token_id: string;
    amount: string;
    owner_of: string;
    token_hash: string;
    block_number_minted: string;
    block_number: string;
    contract_type: string;
    name: string;
    symbol: string;
    token_uri: string;
    metadata: string;
    synced_at: string;
    last_token_uri_sync: string;
    last_metadata_sync: string;
    verified?: boolean;
  }
}
