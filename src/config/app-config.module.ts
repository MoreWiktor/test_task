import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appLoader, etherscanLoader, docsLoader } from './loaders';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appLoader, etherscanLoader, docsLoader],
    }),
  ],
})
export class AppConfigModule {}
