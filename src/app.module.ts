import { Module } from '@nestjs/common';
import { EthModule } from './modules/eth/eth.module';
import { AppConfigModule } from './config';

@Module({
  imports: [AppConfigModule, EthModule],
})
export class AppModule {}
