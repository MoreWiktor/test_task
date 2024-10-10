import { GetLastBlockInfoParams } from './get-last-block-info.type';
import { GetTransactionsInfoParams } from './get-transactions-info.type';

export type MakeRequestParams =
  | GetTransactionsInfoParams
  | GetLastBlockInfoParams;
