import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EventsGateway } from './user.websocket';
import { socket } from 'src/socket';
import { CryptoCoinService } from 'src/crypto-coin/crypto-coin.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private eventsGateway: EventsGateway,
    private readonly cryptoCoinRepository: CryptoCoinService,
  ) {}
  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new BadRequestException('User was not found');
    }
  }
  async getUserAndCoinPrice(id: number) {
    const user = await this.getUser(id);
    const userData = { id: user.id };
    socket.emit('user-connect', userData);
    return userData;
  }

  async disconnectClient(id: number) {
    socket.emit('user-disconnect', { clientId: id });
  }
}
