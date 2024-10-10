export interface Transaction {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  accessList?: AccessList[];
  chainId: string;
  v: string;
  r: string;
  s: string;
  yParity?: string;
  maxFeePerBlobGas?: string;
  blobVersionedHashes?: string[];
}

export interface AccessList {
  address: string;
  storageKeys: string[];
}
