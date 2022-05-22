import { UserRepository } from './../auth/user.repository';
import { AuthModule } from './../auth/auth.module';
import { BoardRepository } from './board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository, UserRepository]),
    AuthModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
