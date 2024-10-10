import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import {
  AppConfigType,
  AppConfigTypeEnum,
  DocsConfigType,
} from './config/types';
import { HttpExceptionFilter } from './exception/http.exception-filter';
import { HttpAdapterHost } from '@nestjs/core';

export class AppFactory {
  private readonly configService: ConfigService;
  public static logger = new Logger('App');

  constructor(private readonly _app: INestApplication) {
    this.configService = this._app.get(ConfigService);
    this.app.setGlobalPrefix('api');
  }

  get app() {
    return this._app;
  }

  public getConfig<T>(token: AppConfigTypeEnum) {
    return this.configService.getOrThrow<T>(token);
  }

  public useGlobalPipes() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    return this;
  }

  public useGlobalFilters() {
    const httpAdapter = this.app.get(HttpAdapterHost);
    this.app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
    this.app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
    return this;
  }

  public generateOpenApiDoc() {
    const { version, enviroment } = this.getConfig<AppConfigType>(
      AppConfigTypeEnum.APP,
    );
    const { pass, user } = this.getConfig<DocsConfigType>(
      AppConfigTypeEnum.DOCS,
    );
    this.app.use(
      `/api/docs/*`,
      basicAuth({
        challenge: true,
        users: {
          [user]: pass,
        },
      }),
    );
    const options = new DocumentBuilder()
      .setTitle('Eth Service')
      .setDescription(`Eth service document. Enviroment: ${enviroment}`)
      .setVersion(version)
      .build();
    const document = SwaggerModule.createDocument(this.app, options, {
      operationIdFactory: (_, methodKey: string) => methodKey,
      deepScanRoutes: true,
    });
    SwaggerModule.setup('docs', this.app, document, {
      useGlobalPrefix: true,
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    });
    return this;
  }

  public async listen() {
    const appConfigs = this.configService.getOrThrow(
      AppConfigTypeEnum.APP,
    ) as AppConfigType;

    await this._app.listen(appConfigs.port, () =>
      AppFactory.logger.log(this.bootstrapMessage(appConfigs)),
    );
  }

  private readonly bootstrapMessage = ({
    port,
    enviroment,
    version,
    name,
    bootstrap_emoji,
  }) => {
    const emojiString = bootstrap_emoji ? bootstrap_emoji + ' ' : '';
    const appNameString = name
      ? name.charAt(0).toUpperCase() + name.slice(1) + ' app'
      : 'App';
    const portString = port ? ` on ${port} port.` : '';
    const versionString = version ? ` Version - ${version}.` : '';
    const enviromentString = enviroment ? ` Environment - ${enviroment}.` : '';
    return (
      emojiString +
      appNameString +
      ' started' +
      portString +
      versionString +
      enviromentString
    );
  };
}
