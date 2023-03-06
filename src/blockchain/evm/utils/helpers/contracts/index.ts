import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { get, isEmpty } from 'lodash';
import {
  BookABI,
  BookCreatorABI,
  DataABI,
  ERC20ABI,
  PageABI,
  RegistryABI,
  TraderABI,
} from '../../../abis';

export class ContractUtils {
  web3: Web3;

  static ABIs: Record<string, any[]> = {
    ERC20: ERC20ABI,
    Book: BookABI,
    BookCreator: BookCreatorABI,
    Page: PageABI,
    Trader: TraderABI,
    Registry: RegistryABI,
    Data: DataABI,
  };

  static ABIsByAddress: Record<string, any[]> = {
    [process.env.NEXT_PUBLIC_COMI_TOKEN_ADDRESS as string]:
      ContractUtils.ABIs.ERC20,
    [process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS as string]:
      ContractUtils.ABIs.Trader,
    [process.env.NEXT_PUBLIC_MC_PROXY_REGISTRY_ADDRESS as string]:
      ContractUtils.ABIs.Registry,
    [process.env.NEXT_PUBLIC_DATA_CONTRACT_ADDRESS as string]:
      ContractUtils.ABIs.Data,
  };

  constructor(provider: any) {
    this.web3 = new Web3(provider);
  }

  /**
   * @description Connects to a smart contract
   * @param address
   * @param abi
   */
  public connect(address: string, abi: any): Contract {
    return new this.web3.eth.Contract(abi, address);
  }

  /**
   * @description Calls a read-only function on a smart contract
   * @param contract
   * @param method
   * @param data
   */
  public call(contract: Contract, method: string, ...data: any) {
    if (!isEmpty(data)) {
      return contract.methods[method](...data).call();
    } else {
      return contract.methods[method]().call();
    }
  }

  /**
   * @description Calls a write-only function on a smart contract
   * @param contract
   * @param method
   * @param data
   */
  public send(contract: Contract, method: string, ...data: any[]) {
    return async (options: any = {}): Promise<any> => {
      const action = contract.methods[method](...data);
      if (!options.gas) {
        const gas_estimate = await action.estimateGas({ from: options.from });
        options.gas = Math.round(gas_estimate * 1.2);
      }
      if (!options.gasPrice) {
        const gasPrice = await this.web3.eth.getGasPrice();
        options.gasPrice = Math.round(Number(gasPrice) * 1.2); // to speed up 1.2 times.
      }
      //console.log('OPTIONSSSS', options);
      return await contract.methods[method](...data).send(options);
    };
  }

  static abiFromAddress(address: string): any[] {
    return get(ContractUtils.ABIsByAddress, address, ContractUtils.ABIs.ERC20);
  }
}
