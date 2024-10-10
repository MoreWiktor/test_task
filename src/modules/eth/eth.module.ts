import { Module } from '@nestjs/common';
import { EthController } from './eth.controller';
import { EthService } from './eth.service';
import { EtherscanApiModule } from 'src/apis/etherscan';

@Module({
  imports: [EtherscanApiModule],
  controllers: [EthController],
  providers: [EthService],
})
export class EthModule {}
