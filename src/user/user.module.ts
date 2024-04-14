import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CryptoCoinModule } from 'src/crypto-coin/crypto-coin.module';
import { EventsGateway } from './user.websocket';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CryptoCoinModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService, EventsGateway],
})
export class UserModule {}
