import { ActionEnum } from './action.enum';
import { EtherscanResponse } from './response.type';
import { Transaction } from './transaction.type';
import { Withdrawal } from './withdrawal.type';

export type GetTransactionsInfoPayload = { tag: string };

export type GetTransactionsInfoParams = {
  action: ActionEnum.GET_BLOCK_BY_NUMBER;
  boolean: boolean;
  tag: string;
};

export type GetTransactionsInfoResponse =
  EtherscanResponse<GetTransactionsInfoResult>;

export type GetTransactionsInfoResult = {
  baseFeePerGas: string;
  blobGasUsed: string;
  difficulty: string;
  excessBlobGas: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentBeaconBlockRoot: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: Transaction[];
  transactionsRoot: string;
  uncles: any[];
  withdrawals: Withdrawal[];
  withdrawalsRoot: string;
};
