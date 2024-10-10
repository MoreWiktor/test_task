import { ErrorMessageEnum } from './errors.enum';

export type EtherscanResponse<T = object> = {
  jsonrpc: string;
  id: number;
  result: T | ErrorMessageEnum;
};
