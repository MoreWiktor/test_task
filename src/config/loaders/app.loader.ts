import { registerAs } from '@nestjs/config';
import { AppConfigType, AppConfigTypeEnum, EnviromentEnum } from '../types';

export const appLoader = registerAs(
  AppConfigTypeEnum.APP,
  (): AppConfigType => ({
    version: process.env.npm_package_version,
    name: process.env.npm_package_name,
    bootstrap_emoji: process.env.BOOTSTRAP_EMOJI,
    port: Number(process.env.APP_PORT),
    enviroment: process.env.NODE_ENV as EnviromentEnum,
    baseUrl: process.env.BASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    cryptoSecret: process.env.CRYPTO_SECRET,
    smtpLogin: process.env.SMTP_LOGIN,
    smtpPassword: process.env.SMTP_PASSWORD,
    frontUrl: process.env.FRONT_URL,
  }),
);
