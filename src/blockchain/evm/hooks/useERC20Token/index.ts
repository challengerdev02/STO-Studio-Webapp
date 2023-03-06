import { useContract } from '../useContract';
import { ActionOption } from '../../../../redux/types';
import BN from 'bn.js';

export interface UseERC20Token {
  approveToken: (
    address: string,
    amount: string | BN,
    options?: ActionOption
  ) => void;
  getTokenBalance: (address?: string, options?: ActionOption) => void;
  getTokenAllowance: (address: string, options?: ActionOption) => void;
  getTokenSymbol: () => void;
  getTokenDecimals: () => void;
  getTokenName: () => void;
  verifyChain: (blockchain: any, callback?: () => void) => void;
  contract: any;
}

export interface UseERC20TokenProps {
  contractAddress: string;
  options?: ActionOption;
}

/**
 * Hook to perform basic ERC20 token operations
 * @name useERC20Token
 * @param props
 */
export const useERC20Token = (props: UseERC20TokenProps): UseERC20Token => {
  const { contractAddress, options } = props;
  const { call, contract, send, verifyChain } = useContract({
    address: contractAddress,
    options,
  });

  /**
   * Calls the balanceOf method of the ERC20 token contract
   * @param address
   * @param options
   */
  const getTokenBalance = (address?: string, options: ActionOption = {}) => {
    if (!address) return 0;
    call('balanceOf', options, address);
  };

  /**
   * Calls the symbol method of the ERC20 token contract
   */
  const getTokenSymbol = () => {
    call('symbol');
  };

  /**
   * Gets the token decimal values
   */
  const getTokenDecimals = () => {
    call('decimals');
  };

  /**
   * Calls the name method of the ERC20 token contract
   */
  const getTokenName = () => {
    call('name');
  };

  /**
   * Gets the token allowance
   * @param walletAddress
   * @param options
   */
  const getTokenAllowance = (
    walletAddress: string,
    options: ActionOption = {}
  ) => {
    call(
      'allowance',
      options,
      walletAddress,

      process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS
    );
  };

  /**
   * Approves the token allowance
   * @param walletAddress
   * @param amount
   * @param options
   */
  const approveToken = (
    walletAddress: string,
    amount: string | BN,
    options: ActionOption = {}
  ) => {
    send(
      'approve',
      { from: walletAddress },
      options,
      process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS,
      amount
    );
  };

  return {
    getTokenBalance,
    getTokenSymbol,
    getTokenDecimals,
    getTokenName,
    getTokenAllowance,
    approveToken,
    contract,
    verifyChain,
  };
};
