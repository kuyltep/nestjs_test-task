import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from 'src/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from 'src/configs/postgres.config';
import { UserModule } from 'src/user/user.module';
import { CryptoCoinModule } from 'src/crypto-coin/crypto-coin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from 'src/configs/mail.config';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MailModule,
    CryptoCoinModule,
    UserModule,
    ConfigModule.forRoot({ load: [configs], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
