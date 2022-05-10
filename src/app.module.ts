import { MariaDbConfigModule } from './configs/database/maridb.config.module';
import { MariaDBConfigService } from './configs/database/mariadb.config.service';
import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.' + process.env.NODE_ENV + '.env',
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [MariaDbConfigModule],
      useClass: MariaDBConfigService,
      inject: [MariaDBConfigService],
    }),
    BoardsModule,
    // https://velog.io/@1571min/NestJS-TypeOrm-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
    // https://gaemi606.tistory.com/entry/NestJS-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%97%B0%EA%B2%B0-%EC%84%A4%EC%A0%95-%EC%A0%95%EB%B3%B4%EB%A5%BC-%EC%9E%85%EB%A0%A5%ED%95%98%EB%8A%94-%EB%8B%A4%EC%96%91%ED%95%9C-%EB%B0%A9%EB%B2%95-database-connection
    // TypeOrmModule.forRoot({
    //   type: 'mariadb',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   synchronize: process.env.SYNCHRONIZE === 'true',
    //   logging: process.env.LOGGING === 'true',
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({

    //   })
    // }),
  ],
})
export class AppModule {}
