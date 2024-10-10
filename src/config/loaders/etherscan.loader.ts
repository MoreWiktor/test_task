import { registerAs } from '@nestjs/config';
import { AppConfigTypeEnum, EtherscanConfigType } from '../types';

export const etherscanLoader = registerAs(
  AppConfigTypeEnum.ETHERSCAN,
  (): EtherscanConfigType => ({
    apiKey: process.env.ETHERSCAN_API_KEY,
    baseUrl: process.env.ETHERSCAN_BASE_URL,
  }),
);
