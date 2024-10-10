import { Module } from '@nestjs/common';
import { EtherscanApi } from './etherscan.api';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [EtherscanApi],
  exports: [EtherscanApi],
})
export class EtherscanApiModule {}
