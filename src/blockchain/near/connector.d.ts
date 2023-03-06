import { ReactNode } from 'react';
import { Contract, WalletConnection } from 'near-api-js';

interface NearWalletConnectorProps {
  children: ReactNode | ReactNode[];
}

interface NearWalletConnectorState {
  // isConnected: boolean;
  // isConnecting: boolean;
  nearConfig?: Record<string, any>;
  contract?: Contract;
  wallet?: WalletConnection;
  currentUser?: { accountId: string; balance: string };
  signedAddress?: string;
}

export enum NearWalletConnectorActionTypes {
  CONNECTOR = 'CONNECTOR',
  ERROR = 'ERROR',
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
  ACCOUNT_PROPERTIES = 'ACCOUNT_PROPERTIES',
  TOGGLE_PROMPT = 'TOGGLE_PROMPT',
}

// An interface for our actions
export interface NearWalletConnectorActions {
  type: NearWalletConnectorActionTypes;
  payload: NearWalletConnectorState;
}

export interface NearBaseWeb3ContextValues extends NearWalletConnectorState {
  connect: () => Promise<void>;
  sign: () => Promise<void>;
  disconnect: () => Promise<void>;
  getBalance: () => Promise<string>;
}
