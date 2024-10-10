import { EnviromentEnum } from './enviroment.enum';

export type AppConfigType = {
  version: string;
  port: number;
  enviroment: EnviromentEnum;
  baseUrl: string;
  jwtSecret: string;
  cryptoSecret: string;
  name: string;
  bootstrap_emoji: string;
  smtpLogin: string;
  smtpPassword: string;
  frontUrl: string;
};
