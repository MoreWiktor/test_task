import { registerAs } from '@nestjs/config';
import { AppConfigTypeEnum, DocsConfigType } from '../types';

export const docsLoader = registerAs(
  AppConfigTypeEnum.DOCS,
  (): DocsConfigType => ({
    user: process.env.DOCS_USER,
    pass: process.env.DOCS_PASS,
  }),
);
