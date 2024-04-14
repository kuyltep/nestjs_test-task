import { Module } from '@nestjs/common';
import { CryptoCoinService } from './crypto-coin.service';
import { CryptoCoinController } from './crypto-coin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoCoinEntity } from './entities/crypto-coin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoCoinEntity])],
  providers: [CryptoCoinService],
  controllers: [CryptoCoinController],
  exports: [CryptoCoinService],
})
export class CryptoCoinModule {}
