import { Controller, Get } from '@nestjs/common';
import { CryptoCoinService } from './crypto-coin.service';

@Controller('crypto-coin')
export class CryptoCoinController {
  constructor(private cryptocoinService: CryptoCoinService) {}
  @Get('from-api')
  getCryptoCoinFromOtherServer() {
    return this.cryptocoinService.getCryptoCoinFromOtherServer();
  }
}
