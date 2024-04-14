import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}
  async sendConfirmMail(user: UserEntity, price: number) {
    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Цена BTC изменилась, срочно проверьте ее',
        template: join(__dirname, '/../templates', 'changePrice'),
        context: {
          id: user.id,
          username: user.username,
          price,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Ошибка работы почты:  ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }
}
