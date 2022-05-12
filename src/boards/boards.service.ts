import { Board } from './../../dist/boards/boards.model.d';
import { CreateBoardDto } from './dto/createBoard.dto';
import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './enum/board-status.enum';

@Injectable()
export class BoardsService {
  getAllBoards(): Board[] {
    throw new NotImplementedException();
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    };
    // this.boards.push(board);
    throw new NotImplementedException();
  }

  getBoardById(id: string): Board {
    // const found = this.boards.find((board) => board.id === id);

    // if (!found) {
    //   throw new NotFoundException(`Can't find Board with id ${id}`);
    // }

    // return found;
    throw new NotImplementedException();
  }

  deleteBoard(id: string): void {
    // const found = this.getBoardById(id);
    // this.boards = this.boards.filter((board) => board.id !== found.id);
    throw new NotImplementedException();
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    // const board = this.getBoardById(id);
    // board.status = status;
    // return board;
    throw new NotImplementedException();
  }
}
