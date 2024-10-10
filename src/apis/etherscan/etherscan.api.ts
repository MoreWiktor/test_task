import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  EtherscanResponse,
  ErrorMessageEnum,
  GetTransactionsInfoPayload,
  GetTransactionsInfoResult,
  MakeRequestParams,
  ActionEnum,
} from './types';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { EtherscanConfigType, AppConfigTypeEnum } from '../../config/types';
import { etherscanExceptionDict } from '../../exception/etherscan.excaption';

@Injectable()
export class EtherscanApi {
  private baseUrl: string;
  private apiKey: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configSetvice: ConfigService,
  ) {
    const { apiKey, baseUrl } =
      this.configSetvice.getOrThrow<EtherscanConfigType>(
        AppConfigTypeEnum.ETHERSCAN,
      );
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  public async getTransactionsInfo(
    payload: GetTransactionsInfoPayload,
  ): Promise<GetTransactionsInfoResult> {
    const { tag } = payload;
    return this.makeRequest<GetTransactionsInfoResult>({
      action: ActionEnum.GET_BLOCK_BY_NUMBER,
      boolean: true,
      tag,
    });
  }

  public async getLastBlock() {
    return this.makeRequest<string>({
      action: ActionEnum.BLOCK_NUMBER,
    });
  }

  private async makeRequest<T>(params: MakeRequestParams) {
    return this.httpService.axiosRef
      .get<EtherscanResponse<T>>(this.baseUrl, {
        params: {
          apiKey: this.apiKey,
          module: 'proxy',
          ...params,
        },
      })
      .then(this.errorHandler<T>)
      .then(this.unwrapResponse<T>);
  }

  private errorHandler<T>(response: AxiosResponse<EtherscanResponse<T>>) {
    const exception =
      etherscanExceptionDict[response.data.result as ErrorMessageEnum];
    if (exception) throw exception;
    return response;
  }

  private unwrapResponse<T>(response: AxiosResponse<EtherscanResponse<T>>) {
    return response.data.result as T;
  }
}
