import { BadRequestException, HttpException } from '@nestjs/common';
import { ErrorMessageEnum } from '../apis/etherscan/types';

export const etherscanExceptionDict: Record<ErrorMessageEnum, HttpException> = {
  [ErrorMessageEnum.INVALID_API_KEY]: new BadRequestException(
    'Invalid Etherscan api key',
  ),
};
