import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoCoinEntity } from './entities/crypto-coin.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class CryptoCoinService {
  constructor(
    @InjectRepository(CryptoCoinEntity)
    private cryptoCoinRepository: Repository<CryptoCoinEntity>,
  ) {}
  async getCryptoCoinFromOtherServer() {
    const cryptoCoin = await axios.get(
      'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD',
    );
    const price = Number(cryptoCoin.data['USD']);
    const dbCoin = await this.cryptoCoinRepository.findOne({
      where: { name: 'BTC' },
    });
    console.log(dbCoin);
    if (!dbCoin) {
      await this.cryptoCoinRepository.save({ price, name: 'BTC' });
    } else {
      await this.cryptoCoinRepository.update(dbCoin, { price });
    }
    return await this.cryptoCoinRepository.findOne({ where: { name: 'BTC' } });
  }
  async getCoinFromDataBase() {
    return await this.cryptoCoinRepository.findOne({ where: { name: 'BTC' } });
  }
}
