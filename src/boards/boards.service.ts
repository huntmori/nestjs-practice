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
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const boardItem = this.boardRepository.create({
      uuid: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(boardItem);

    return boardItem;
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
}
