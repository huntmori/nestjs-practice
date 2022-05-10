import { MariaDBConfigService } from './mariadb.config.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MariaDBConfigService],
})
export class MariaDbConfigModule {}
