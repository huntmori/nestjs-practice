import { UserRepository } from './../auth/user.repository';
import { User } from './../auth/entities/user.entity';
import { Board } from './entities/board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/createBoard.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './enum/board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const target = await this.getBoardById(id);

    if (target.user !== user) {
      throw new BadRequestException();
    }
    const result = await this.boardRepository.delete(id);
    console.log('result', result);
  }

  async updateBoardStatus(
    id: number,
    user: User,
    status: BoardStatus,
  ): Promise<Board> {
    const item = await this.getBoardById(id);

    if (item.user !== user) {
      throw new BadRequestException();
    }

    item.status = status;
    await this.boardRepository.save(item);

    return item;
  }

  async getAllBoard(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getTargetUserBoard(id: number): Promise<Board[]> {
    const user = await this.userRepository.findOne(id);
    return await this.boardRepository.find({ user: user });
  }

  async getThisUserBoard(user: User): Promise<Board[]> {
    const params = { user: user };
    return await this.boardRepository.find(params);
  }
}
