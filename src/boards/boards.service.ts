import { UserRepository } from './../auth/user.repository';
import { User } from './../auth/entities/user.entity';
import { Board } from './entities/board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/createBoard.dto';
import {
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

  async deleteBoard(id: number): Promise<void> {
    const target = await this.boardRepository.delete(id);

    console.log('result', target);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const item = await this.getBoardById(id);
    item.status = status;
    await this.boardRepository.save(item);

    return item;
  }

  async getAllBoard(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getTargetUserBoard(id: number): Promise<Board[]> {
    const user = await this.userRepository.findOne(id);
    return this.boardRepository.find({ user: user });
  }
}
