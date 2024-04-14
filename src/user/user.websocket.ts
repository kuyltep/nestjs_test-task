import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { CryptoCoinService } from 'src/crypto-coin/crypto-coin.service';
import { Repository } from 'typeorm';
import { Server } from 'ws';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly cryptoCoinService: CryptoCoinService,
    private readonly mailService: MailService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  @WebSocketServer() server: Server;
  private sessions = new Map();

  afterInit(server: Server) {
    server.on('connection', async (ws, req) => {
      console.log(this.sessions);
      while (true) {
        const oldCoinData = await this.cryptoCoinService.getCoinFromDataBase();
        const coinData =
          await this.cryptoCoinService.getCryptoCoinFromOtherServer();
        const oldHundreds = Math.floor(oldCoinData.price / 100) % 10;
        const newHundreds = Math.floor(coinData.price / 100) % 10;
        if (newHundreds !== oldHundreds) {
          const users = await this.userRepository.find();
          users.forEach((user) => {
            if (!this.sessions.get(user.id)) {
              this.mailService.sendConfirmMail(user, coinData.price);
            }
          });
        }
        for (const key of this.sessions.keys()) {
          this.sessions.set(key, coinData.price);
        }
        console.log(this.sessions);
        await new Promise((resovle) => setTimeout(resovle, 60000));
      }
    });
  }
  handleConnection() {
    console.log('Client connected');
    return this.sessions;
  }
  @SubscribeMessage('user-connect')
  async userConnection(@MessageBody() data: { id: number }) {
    const coinData = await this.cryptoCoinService.getCoinFromDataBase();
    this.sessions.set(data.id, coinData.price);
    console.log(this.sessions);
  }
  @SubscribeMessage('user-disconnect')
  handleDisconnect(@MessageBody() data: { clientId: number }) {
    this.sessions.delete(data.clientId);
    console.log(this.sessions);
  }
}
