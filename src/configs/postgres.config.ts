import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('db_host'),
    port: parseInt(configService.get('db_port')),
    username: configService.get('db_user'),
    password: configService.get('db_password'),
    database: configService.get('db_name'),
    synchronize: true,
    autoLoadEntities: true,
  };
};
