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
}
