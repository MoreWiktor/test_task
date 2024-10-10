import { Controller, Get } from '@nestjs/common';
import { EthService } from './eth.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('eth')
export class EthController {
  constructor(private readonly ethService: EthService) {}

  @Get('lastHundredMaxValue')
  @ApiOkResponse({
    example: '0x3cc87dadee1324a115a748aee5c3fa050c92f72c',
  })
  @ApiBadRequestResponse({
    example: {
      statusCode: 400,
      message: 'Invalid Etherscan api key',
      timestamp: '2024-10-10T13:59:43.932Z',
      path: '/api/eth/lastHundredMaxValue',
    },
  })
  public async lastHundredMaxValue(): Promise<string> {
    return this.ethService.getLastHundredMaxValue();
  }
}
