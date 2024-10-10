import { Injectable } from '@nestjs/common';
import { Transaction } from '../../apis/etherscan/types';
import { EtherscanApi } from '../../apis/etherscan';

@Injectable()
export class EthService {
  constructor(private readonly etherscanApi: EtherscanApi) {}

  public async getLastHundredMaxValue(): Promise<string> {
    const tag = await this.etherscanApi.getLastBlock();
    const transactionsInfo = await this.etherscanApi.getTransactionsInfo({
      tag,
    });
    return this.getAddressWithMaxValue(transactionsInfo.transactions);
  }

  public getAddressWithMaxValue(transactions: Transaction[]): string {
    const dict: Record<string, number> = {};
    transactions
      .filter((t) => Number(t.value) !== 0)
      .map((t) => {
        dict[t.from] = (dict[t.from] || 0) + Number(t.value);
        dict[t.to] = (dict[t.to] || 0) + Number(t.value);
      });
    return Object.entries(dict)
      .sort(([, aValue], [, bValue]) => (aValue >= bValue ? 1 : -1))
      .at(-1)[0];
  }
}
